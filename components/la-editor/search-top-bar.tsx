import React, { useState, useEffect, useCallback } from 'react'
import { Editor } from '@tiptap/react'
import { Icon } from './components/ui/icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchTopBarProps {
  editor: Editor | null
}

const SearchTopBar: React.FC<SearchTopBarProps> = ({ editor }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [replaceTerm, setReplaceTerm] = useState<string>('ProseMirror')
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false)
  const [showReplaceSection, setShowReplaceSection] = useState<boolean>(false)

  const updateSearchReplace = useCallback(
    (clearIndex: boolean = false) => {
      if (!editor) return
      if (clearIndex) editor.commands.resetIndex()
      editor.commands.setSearchTerm(searchTerm)
      editor.commands.setReplaceTerm(replaceTerm)
      editor.commands.setCaseSensitive(caseSensitive)
    },
    [editor, searchTerm, replaceTerm, caseSensitive],
  )

  const goToPosition = useCallback(() => {
    if (!editor) return
    const { results, resultIndex } = editor.storage.searchAndReplace
    const position = results[resultIndex]
    if (!position) return

    // Get the DOM node at the position
    const { node } = editor.view.domAtPos(position.from)

    // Scroll the node into view if it's an HTML element
    if (node instanceof HTMLElement) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [editor])

  const clear = useCallback(() => {
    setSearchTerm('')
    setReplaceTerm('')
    editor?.commands.resetIndex()
  }, [editor])

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim()
    if (!trimmedSearchTerm) {
      clear()
    } else {
      updateSearchReplace(true)
    }
  }, [clear, searchTerm, updateSearchReplace])

  useEffect(() => {
    updateSearchReplace()
  }, [replaceTerm, updateSearchReplace])

  useEffect(() => {
    updateSearchReplace(true)
  }, [caseSensitive, updateSearchReplace])

  useEffect(() => {
    const timeoutId = setTimeout(updateSearchReplace, 0)
    return () => clearTimeout(timeoutId)
  }, [updateSearchReplace])

  const replace = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      editor?.commands.replace()
      goToPosition()
    },
    [editor, goToPosition],
  )

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      editor?.commands.nextSearchResult()
      goToPosition()
    },
    [editor, goToPosition],
  )

  const previous = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      editor?.commands.previousSearchResult()
      goToPosition()
    },
    [editor, goToPosition],
  )

  const replaceAll = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      editor?.commands.replaceAll()
    },
    [editor],
  )

  const handleSearchTermChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('search term change')
    setSearchTerm(e.target.value)
  }, [])

  const handleReplaceTermChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceTerm(e.target.value)
  }, [])

  const handleCaseSensitiveChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCaseSensitive(e.target.checked)
  }, [])

  const toggleReplaceSection = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setShowReplaceSection(prev => !prev)
  }, [])

  if (!editor) return null

  return (
    <div className="absolute right-4 top-0 z-50 w-80 translate-y-14 transform rounded-lg bg-card opacity-100 ring-2 ring-ring/50 transition-opacity">
      <div className="flex items-center gap-2.5 p-2.5">
        <div className="flex w-full grow items-center">
          <Input
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="h-auto min-h-6 border-none p-0 shadow-none focus-visible:ring-0"
            placeholder="Find or replace..."
          />
        </div>
        <div className="flex h-7 cursor-default select-none items-center text-[0.8rem] text-[rgb(172,171,169)]">
          <div className="flex flex-row items-center gap-1">
            <span>1</span>
            <span>of</span>
            <span>1</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-0.5">
          <Button
            size="icon"
            variant="ghost"
            tabIndex={0}
            aria-label="Button to navigate to the previous result"
            className="size-7"
            onClick={previous}
          >
            <Icon name="ArrowUp" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            tabIndex={0}
            aria-label="Button to navigate to the previous result"
            className="size-7"
            onClick={next}
          >
            <Icon name="ArrowDown" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            tabIndex={0}
            aria-label="Toggle replace section"
            className="size-7"
            onClick={toggleReplaceSection}
          >
            <Icon name="Replace" className={showReplaceSection ? 'text-primary' : ''} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            tabIndex={0}
            aria-label="Button to navigate to the previous result"
            className="size-7"
          >
            <Icon name="X" />
          </Button>
        </div>
      </div>

      {/* Replace section */}
      <AnimatePresence>
        {showReplaceSection && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Separator />
            <div className="flex flex-col items-end gap-3 p-2.5">
              <div className="flex w-full flex-grow items-center bg-transparent text-inherit">
                <Input
                  value={replaceTerm}
                  onChange={handleReplaceTermChange}
                  placeholder="Replace with..."
                  className="h-auto min-h-6 border-none p-0 shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="flex flex-row gap-1">
                <Button size="sm" variant="ghost" onClick={replace}>
                  Replace
                </Button>
                <Button size="sm" onClick={replaceAll}>
                  <div className="flex flex-row items-center gap-1">
                    Replace all
                    <span>
                      <Icon name="CornerDownLeft" />
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchTopBar
