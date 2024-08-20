import type { Editor } from '@tiptap/core'
import type { EditorOutput } from '../../types'

export function getOutput(editor: Editor, output: EditorOutput) {
  if (output === 'json') {
    return editor.getJSON()
  }

  if (output === 'html') {
    return editor.getText() ? String(editor.getHTML()) : ''
  }

  return editor.getText()
}

export * from './keyboard'
export * from './platform'
export * from './isCustomNodeSelected'
export * from './isTextSelected'
