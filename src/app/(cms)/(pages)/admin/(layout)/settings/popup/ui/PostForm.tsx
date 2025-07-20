'use client'

import { useState } from 'react'
import { Button } from '@//app/(cms)/_shared/ui/button'
import { Input } from '@//app/(cms)/_shared/ui/input'
import { CreatePostData } from '../model/types'

interface PostFormProps {
  onSubmit: (data: CreatePostData) => Promise<void>
  isLoading?: boolean
}

export function PostForm({ onSubmit, isLoading = false }: PostFormProps) {
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
    author: '',
    isPublished: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 필수 필드 검증
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.trim()
    ) {
      alert('모든 필수 필드를 입력해주세요.')
      return
    }

    await onSubmit(formData)
    setFormData({ title: '', content: '', author: '', isPublished: false })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label htmlFor='title' className='block text-sm font-medium mb-2'>
          제목
        </label>
        <Input
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='게시글 제목을 입력하세요'
          required
        />
      </div>

      <div>
        <label htmlFor='author' className='block text-sm font-medium mb-2'>
          작성자
        </label>
        <Input
          id='author'
          name='author'
          value={formData.author}
          onChange={handleChange}
          placeholder='작성자 이름을 입력하세요'
          required
        />
      </div>

      <div>
        <label htmlFor='content' className='block text-sm font-medium mb-2'>
          내용
        </label>
        <textarea
          id='content'
          name='content'
          value={formData.content}
          onChange={handleChange}
          placeholder='게시글 내용을 입력하세요'
          required
          rows={6}
          className='w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
        />
      </div>

      <div className='flex items-center space-x-2'>
        <input
          id='isPublished'
          name='isPublished'
          type='checkbox'
          checked={formData.isPublished}
          onChange={handleChange}
          className='h-4 w-4 rounded border-gray-300'
        />
        <label htmlFor='isPublished' className='text-sm font-medium'>
          즉시 발행
        </label>
      </div>

      <Button type='submit' disabled={isLoading} className='w-full'>
        {isLoading ? '저장 중...' : '게시글 저장'}
      </Button>
    </form>
  )
}
