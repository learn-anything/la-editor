import * as React from 'react'
import type { Content, UseEditorOptions } from '@tiptap/react'
import { useEditor } from '@tiptap/react'
import type { Editor } from '@tiptap/core'
import { cn } from '@/lib/utils'
import { StarterKit } from '@tiptap/starter-kit'
import { getOutput } from '../lib/utils'
import { useThrottle } from '../hooks/use-throttle'
import { EditorOutput } from '../types'
import {
  TaskList,
  TaskItem,
  HorizontalRule,
  SlashCommand,
  Heading,
  Link,
  CodeBlockLowlight,
  Selection,
  Color,
  TrailingNode,
  TextStyle,
  Placeholder,
  SearchAndReplace,
} from '../extensions'

export interface UseLaEditorProps extends UseEditorOptions {
  value?: Content
  output?: EditorOutput
  placeholder?: string
  editorClassName?: string
  throttleDelay?: number
  onUpdate?: (content: Content) => void
  onBlur?: (content: Content) => void
}

const createExtensions = (placeholder?: string) => [
  StarterKit.configure({
    blockquote: { HTMLAttributes: { class: 'block-node' } },
    bulletList: { HTMLAttributes: { class: 'list-node' } },
    code: { HTMLAttributes: { class: 'inline', spellCheck: 'false' } },
    dropcursor: { width: 2, class: 'ProseMirror-dropcursor border' },
    orderedList: { HTMLAttributes: { class: 'list-node' } },
    paragraph: { HTMLAttributes: { class: 'text-node' } },
    codeBlock: false,
    heading: false,
    horizontalRule: false,
  }),
  Heading,
  Link,
  TaskList,
  TaskItem,
  Selection,
  TrailingNode,
  SlashCommand,
  HorizontalRule,
  CodeBlockLowlight,
  SearchAndReplace,
  Color,
  TextStyle,
  Placeholder.configure({ placeholder: () => placeholder ?? 'Type something...' }),
]

export const useLaEditor = ({
  value,
  output = 'html',
  placeholder,
  editorClassName,
  throttleDelay = 1000,
  onUpdate,
  onBlur,
  editorProps: userEditorProps = {},
  ...props
}: UseLaEditorProps) => {
  const throttledSetValue = useThrottle((value: Content) => onUpdate?.(value), throttleDelay)

  const handleUpdate = React.useCallback(
    (editor: Editor) => throttledSetValue(getOutput(editor, output)),
    [output, throttledSetValue],
  )

  const handleCreate = React.useCallback(
    (editor: Editor) => {
      if (value) {
        editor.commands.setContent(value)
      }
    },
    [value],
  )

  const handleBlur = React.useCallback((editor: Editor) => onBlur?.(getOutput(editor, output)), [output, onBlur])

  const editor = useEditor({
    extensions: createExtensions(placeholder),
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: cn('focus:outline-none', editorClassName),
      },
      ...userEditorProps,
    },
    onUpdate: ({ editor }) => handleUpdate(editor),
    onCreate: ({ editor }) => handleCreate(editor),
    onBlur: ({ editor }) => handleBlur(editor),
    ...props,
  })

  return editor
}

export default useLaEditor
