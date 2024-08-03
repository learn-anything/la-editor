'use client'

import StarterKit from '@tiptap/starter-kit'
import Focus from '@tiptap/extension-focus'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'

// Extensions
import { TaskList } from './task-list'
import { TaskItem } from './task-item'
import { Document } from './document'
import { HorizontalRule } from './horizontal-rule'
import { Blockquote } from './blockquote/blockquote'
import { SlashCommand } from './slash-command'
import { Heading } from './heading'
import { Link } from './link'
import { CodeBlockLowlight } from './code-block-lowlight'
import { Selection } from './selection'

export interface ExtensionOptions {
  placeholder?: string
}

export const createExtensions = ({ placeholder = 'Start typing...' }: ExtensionOptions) => [
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: 'text-node',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-node',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-node',
      },
    },
    document: false,
    heading: false,
    dropcursor: {
      width: 2,
      class: 'ProseMirror-dropcursor border',
    },
    horizontalRule: false,
    blockquote: false,
    code: {
      HTMLAttributes: {
        class: 'inline',
        spellCheck: 'false',
      },
    },
    codeBlock: false,
  }),
  Document,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  Blockquote,
  CodeBlockLowlight,
  TaskList,
  TaskItem,
  Link,
  SlashCommand,
  Focus,
  Typography,
  Selection,
  Placeholder.configure({
    includeChildren: false,
    showOnlyCurrent: true,
    placeholder: () => placeholder,
  }),
]

export default createExtensions
