import { Extension, Range, type Dispatch } from '@tiptap/core'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Plugin, PluginKey, type EditorState, type Transaction } from '@tiptap/pm/state'
import { Node as PMNode } from '@tiptap/pm/model'

// Type definitions for the extension
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    search: {
      setSearchTerm: (searchTerm: string) => ReturnType
      setReplaceTerm: (replaceTerm: string) => ReturnType
      setCaseSensitive: (caseSensitive: boolean) => ReturnType
      resetIndex: () => ReturnType
      nextSearchResult: () => ReturnType
      previousSearchResult: () => ReturnType
      replace: () => ReturnType
      replaceAll: () => ReturnType
    }
  }
}

// Helper interfaces
interface TextNodesWithPosition {
  text: string
  pos: number
}

interface ProcessedSearches {
  decorationsToReturn: DecorationSet
  results: Range[]
}

// Helper function to create a regex based on search parameters
const createSearchRegex = (searchTerm: string, disableRegex: boolean, caseSensitive: boolean): RegExp => {
  const flags = caseSensitive ? 'gu' : 'gui'
  const escapedTerm = disableRegex ? searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : searchTerm
  return new RegExp(escapedTerm, flags)
}

// Main function to process searches and create decorations
function processSearches(
  doc: PMNode,
  searchTerm: RegExp,
  searchResultClass: string,
  resultIndex: number,
): ProcessedSearches {
  const decorations: Decoration[] = []
  const results: Range[] = []

  // If there's no search term, return empty results
  if (!searchTerm) {
    return { decorationsToReturn: DecorationSet.empty, results: [] }
  }

  // Collect all text nodes with their positions
  const textNodesWithPosition = collectTextNodes(doc)

  // Find matches and create decorations
  for (const { text, pos } of textNodesWithPosition) {
    const matches = Array.from(text.matchAll(searchTerm)).filter(([matchText]) => matchText.trim())

    for (const match of matches) {
      if (match[0] === '') break

      if (match.index !== undefined) {
        const from = pos + match.index
        const to = from + match[0].length
        results.push({ from, to })

        const className =
          results.length - 1 === resultIndex ? `${searchResultClass} ${searchResultClass}-current` : searchResultClass

        decorations.push(Decoration.inline(from, to, { class: className }))
      }
    }
  }

  return {
    decorationsToReturn: DecorationSet.create(doc, decorations),
    results,
  }
}

// Helper function to collect text nodes from the document
function collectTextNodes(doc: PMNode): TextNodesWithPosition[] {
  const textNodes: TextNodesWithPosition[] = []
  let currentIndex = 0

  doc.descendants((node, pos) => {
    if (node.isText) {
      if (textNodes[currentIndex]) {
        textNodes[currentIndex].text += node.text
      } else {
        textNodes[currentIndex] = { text: node.text || '', pos }
      }
    } else {
      currentIndex++
    }
  })

  return textNodes.filter(Boolean)
}

// Function to replace a single instance
function replaceSingle(
  replaceTerm: string,
  results: Range[],
  { state, dispatch }: { state: EditorState; dispatch: Dispatch },
) {
  const firstResult = results[0]
  if (!firstResult) return

  const { from, to } = firstResult
  if (dispatch) dispatch(state.tr.insertText(replaceTerm, from, to))
}

// Function to replace all instances
function replaceAll(replaceTerm: string, results: Range[], { tr, dispatch }: { tr: Transaction; dispatch: Dispatch }) {
  let offset = 0
  const resultsCopy = results.slice()

  for (let i = 0; i < resultsCopy.length; i++) {
    const { from, to } = resultsCopy[i]
    tr.insertText(replaceTerm, from - offset, to - offset)
    offset += to - from - replaceTerm.length
  }

  dispatch?.(tr)
}

// Plugin key for the search and replace plugin
export const searchAndReplacePluginKey = new PluginKey('searchAndReplacePlugin')

// Options and storage interfaces
export interface SearchAndReplaceOptions {
  searchResultClass: string
  disableRegex: boolean
}

export interface SearchAndReplaceStorage {
  searchTerm: string
  replaceTerm: string
  results: Range[]
  lastSearchTerm: string
  caseSensitive: boolean
  lastCaseSensitive: boolean
  resultIndex: number
  lastResultIndex: number
}

// Main extension definition
export const SearchAndReplace = Extension.create<SearchAndReplaceOptions, SearchAndReplaceStorage>({
  name: 'searchAndReplace',

  addOptions() {
    return {
      searchResultClass: 'search-result',
      disableRegex: true,
    }
  },

  addStorage() {
    return {
      searchTerm: '',
      replaceTerm: '',
      results: [],
      lastSearchTerm: '',
      caseSensitive: false,
      lastCaseSensitive: false,
      resultIndex: 0,
      lastResultIndex: 0,
    }
  },

  addCommands() {
    return {
      setSearchTerm:
        (searchTerm: string) =>
        ({ editor }) => {
          editor.storage.searchAndReplace.searchTerm = searchTerm
          return false
        },
      setReplaceTerm:
        (replaceTerm: string) =>
        ({ editor }) => {
          editor.storage.searchAndReplace.replaceTerm = replaceTerm
          return false
        },
      setCaseSensitive:
        (caseSensitive: boolean) =>
        ({ editor }) => {
          editor.storage.searchAndReplace.caseSensitive = caseSensitive
          return false
        },
      resetIndex:
        () =>
        ({ editor }) => {
          editor.storage.searchAndReplace.resultIndex = 0
          return false
        },
      nextSearchResult:
        () =>
        ({ editor }) => {
          const { results, resultIndex } = editor.storage.searchAndReplace
          editor.storage.searchAndReplace.resultIndex = (resultIndex + 1) % results.length
          return false
        },
      previousSearchResult:
        () =>
        ({ editor }) => {
          const { results, resultIndex } = editor.storage.searchAndReplace
          editor.storage.searchAndReplace.resultIndex = (resultIndex - 1 + results.length) % results.length
          return false
        },
      replace:
        () =>
        ({ editor, state, dispatch }) => {
          const { replaceTerm, results } = editor.storage.searchAndReplace
          replaceSingle(replaceTerm, results, { state, dispatch })
          return false
        },
      replaceAll:
        () =>
        ({ editor, tr, dispatch }) => {
          const { replaceTerm, results } = editor.storage.searchAndReplace
          replaceAll(replaceTerm, results, { tr, dispatch })
          return false
        },
    }
  },

  addProseMirrorPlugins() {
    const editor = this.editor
    const { searchResultClass, disableRegex } = this.options

    return [
      new Plugin({
        key: searchAndReplacePluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply({ doc, docChanged }, oldState) {
            const { searchTerm, lastSearchTerm, caseSensitive, lastCaseSensitive, resultIndex, lastResultIndex } =
              editor.storage.searchAndReplace

            // Check if we need to update the decorations
            if (
              !docChanged &&
              lastSearchTerm === searchTerm &&
              lastCaseSensitive === caseSensitive &&
              lastResultIndex === resultIndex
            ) {
              return oldState
            }

            // Update last values
            editor.storage.searchAndReplace.lastSearchTerm = searchTerm
            editor.storage.searchAndReplace.lastCaseSensitive = caseSensitive
            editor.storage.searchAndReplace.lastResultIndex = resultIndex

            // Process searches and update results
            if (!searchTerm) {
              editor.storage.searchAndReplace.results = []
              return DecorationSet.empty
            }

            const searchRegex = createSearchRegex(searchTerm, disableRegex, caseSensitive)
            const { decorationsToReturn, results } = processSearches(doc, searchRegex, searchResultClass, resultIndex)

            editor.storage.searchAndReplace.results = results

            return decorationsToReturn
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})

export default SearchAndReplace
