import { Editor } from '@tiptap/react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Palette,
  Redo,
  Strikethrough,
  UnderlineIcon,
  Undo
} from 'lucide-react'

import { cn } from '../../lib'
import { Button } from '../../shadcn'

export default function RichEditorTools({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('이미지 URL을 입력하세요:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const url = window.prompt('링크 URL을 입력하세요:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run()
  }

  const setHighlight = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run()
  }

  return (
    <div className="border-b border-gray-200 p-2">
      <div className="flex flex-wrap gap-1">
        {/* 텍스트 스타일 */}
        <Button
          className={cn(editor.isActive('bold') && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-3" />
        </Button>
        <Button
          className={cn(editor.isActive('italic') && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-3" />
        </Button>
        <Button
          className={cn(editor.isActive('underline') && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-3" />
        </Button>
        <Button
          className={cn(editor.isActive('strike') && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="size-3" />
        </Button>

        {/* 리스트 */}
        <Button
          className={cn(editor.isActive('bulletList') && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-3" />
        </Button>
        <Button
          className={cn(editor.isActive('orderedList') && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-3" />
        </Button>

        {/* 정렬 */}
        <Button
          className={cn(editor.isActive({ textAlign: 'left' }) && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft className="size-3" />
        </Button>
        <Button
          className={cn(editor.isActive({ textAlign: 'center' }) && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter className="size-3" />
        </Button>
        <Button
          className={cn(editor.isActive({ textAlign: 'right' }) && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight className="size-3" />
        </Button>
        <Button
          className={cn(editor.isActive({ textAlign: 'justify' }) && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <AlignJustify className="size-3" />
        </Button>

        {/* 링크 및 이미지 */}
        <Button
          className={cn(editor.isActive('link') && 'bg-gray-200')}
          size="sm"
          variant="ghost"
          onClick={setLink}
        >
          <LinkIcon className="size-3" />
        </Button>
        <Button size="sm" variant="ghost" onClick={addImage}>
          <ImageIcon className="size-3" />
        </Button>

        {/* 색상 */}
        <Button size="sm" variant="ghost" onClick={() => setColor('#958DF1')}>
          <Palette className="size-3" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setHighlight('#faf594')}>
          <Highlighter className="size-3" />
        </Button>

        {/* 실행 취소/다시 실행 */}
        <Button
          disabled={!editor.can().undo()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="size-3" />
        </Button>
        <Button
          disabled={!editor.can().redo()}
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="size-3" />
        </Button>
      </div>
    </div>
  )
}
