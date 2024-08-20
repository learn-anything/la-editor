'use client'

import React, { useCallback, useRef, useEffect, useState } from 'react'
import { LaEditor, LAEditorRef } from '@/components/la-editor'
import { Content, EditorContent, useEditor } from '@tiptap/react'
import { EditorView } from '@tiptap/pm/view'
import { Editor } from '@tiptap/react'
import { toast } from 'sonner'
import { initialContent } from '@/lib/data/initial-content'
import { StarterKit } from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const TITLE_PLACEHOLDER = 'Page title'

export const HomePageComponent = () => {
  const [title, setTitle] = useState<Content>(initialContent.title)
  const [content, setContent] = useState<Content>(initialContent.content)

  const titleEditorRef = useRef<Editor | null>(null)
  const contentEditorRef = useRef<LAEditorRef>(null)

  const updatePageContent = useCallback((content: Content) => {
    setContent(content)
  }, [])

  const handleTitleBlur = useCallback(
    (editor: Editor) => {
      const newTitle = editor.getText().trim()

      if (!newTitle) {
        toast.error('Update failed', {
          description: 'Title must be longer than or equal to 1 character',
        })
        editor.commands.setContent(title)
        return
      }

      if (newTitle !== title) {
        setTitle(newTitle)
        editor.commands.setContent(newTitle)
      }
    },
    [title],
  )

  const handleTitleKeyDown = useCallback((view: EditorView, event: KeyboardEvent) => {
    const editor = titleEditorRef.current
    if (!editor) return false

    const { state } = editor
    const { selection } = state
    const { $anchor } = selection

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        if ($anchor.pos === state.doc.content.size - 1) {
          event.preventDefault()
          contentEditorRef.current?.editor?.commands.focus('start')
          return true
        }
        break
      case 'Enter':
        if (!event.shiftKey) {
          event.preventDefault()
          contentEditorRef.current?.editor?.commands.focus('start')
          return true
        }
        break
    }

    return false
  }, [])

  const handleContentKeyDown = useCallback((view: EditorView, event: KeyboardEvent) => {
    const editor = contentEditorRef.current?.editor
    if (!editor) return false

    const { state } = editor
    const { selection } = state
    const { $anchor } = selection

    if ((event.key === 'ArrowLeft' || event.key === 'ArrowUp') && $anchor.pos - 1 === 0) {
      event.preventDefault()
      titleEditorRef.current?.commands.focus('end')
      return true
    }

    return false
  }, [])

  const titleEditor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        blockquote: false,
        bold: false,
        bulletList: false,
        code: false,
        codeBlock: false,
        dropcursor: false,
        gapcursor: false,
        hardBreak: false,
        heading: false,
        horizontalRule: false,
        italic: false,
        listItem: false,
        orderedList: false,
        strike: false,
      }),
      Placeholder.configure({ placeholder: () => TITLE_PLACEHOLDER }),
    ],
    editorProps: {
      attributes: {
        spellcheck: 'true',
        role: 'textbox',
        'aria-readonly': 'false',
        'aria-multiline': 'false',
        'aria-label': TITLE_PLACEHOLDER,
        translate: 'no',
      },
      handleKeyDown: handleTitleKeyDown,
    },
    onCreate: ({ editor }) => {
      editor.commands.setContent(`<p>${title}</p>`)
    },
    onBlur: ({ editor }) => handleTitleBlur(editor),
  })

  useEffect(() => {
    if (titleEditor) {
      titleEditorRef.current = titleEditor
    }
  }, [titleEditor])

  return (
    <form>
      <EditorContent
        editor={titleEditor}
        className="la-editor mb-2 cursor-text select-text text-2xl font-semibold leading-[calc(1.33333)] tracking-[-0.00625rem]"
      />

      <LaEditor
        ref={contentEditorRef}
        value={content}
        editorClassName="p-4 -mx-4"
        editorContentClassName="flex flex-col"
        placeholder="Add content..."
        output="json"
        throttleDelay={3000}
        onUpdate={updatePageContent}
        editorProps={{
          handleKeyDown: handleContentKeyDown,
        }}
        onBlur={updatePageContent}
      />
    </form>
  )
}
