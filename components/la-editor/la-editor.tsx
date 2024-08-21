import React, { useImperativeHandle } from 'react'
import { EditorContent } from '@tiptap/react'
import { Editor, Content } from '@tiptap/react'
import { BubbleMenu } from './components/bubble-menu'
import './styles/index.css'
import { cn } from '@/lib/utils'
import { useLaEditor, UseLaEditorProps } from './hooks/use-la-editor'
import SearchTopBar from './search-top-bar'

export interface LaEditorProps extends UseLaEditorProps {
  value?: Content
  className?: string
  editorContentClassName?: string
}

export interface LAEditorRef {
  editor: Editor | null
}

export const LaEditor = React.forwardRef<LAEditorRef, LaEditorProps>(
  ({ value, className, editorContentClassName, ...props }, ref) => {
    const editor = useLaEditor({ value, ...props })

    useImperativeHandle(ref, () => ({ editor }), [editor])

    if (!editor) {
      return null
    }

    return (
      <div className={cn('la-editor-container', className)}>
        <EditorContent editor={editor} className={cn('la-editor', editorContentClassName)} />
        <BubbleMenu editor={editor} />
        <SearchTopBar editor={editor} />
      </div>
    )
  },
)

LaEditor.displayName = 'LaEditor'

export default LaEditor
