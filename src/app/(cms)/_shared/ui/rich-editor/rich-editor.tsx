'use client'

import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import RichEditorTools from './rich-editor-tools'

export default function RichEditor({
  content = '',
  onChange,
  placeholder = '내용을 입력하세요...',
}: {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    // 서버 사이드 렌더링 방지
    immediatelyRender: false,
  })

  return (
    <div className='border border-gray-200 rounded-lg'>
      <RichEditorTools editor={editor} />
      <EditorContent
        className='prose prose-sm max-w-none p-4 max-h-[50lvh] overflow-y-auto'
        editor={editor}
      />
    </div>
  )
}
