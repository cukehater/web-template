'use client'

import { useState } from 'react'

import { Button } from '@//app/(cms)/_shared/shadcn/button'

import { CreatePostData, Post } from './model/types'
import { PostForm } from './ui/PostForm'
import { PostList } from './ui/PostList'

export default function Page() {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const handleSubmit = async (data: CreatePostData) => {
    try {
      setIsSubmitting(true)

      const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts'

      const method = editingPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('게시글 저장에 실패했습니다.')
      }

      // 성공 시 폼 닫기 및 상태 초기화
      setShowForm(false)
      setEditingPost(null)

      // 페이지 새로고침으로 목록 업데이트
      window.location.reload()
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingPost(null)
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>게시글 관리</h1>
        <p className='text-gray-600'>
          SQLite + Prisma를 사용한 게시글 작성 및 관리 시스템입니다.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* 게시글 목록 */}
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>게시글 목록</h2>
            <Button disabled={showForm} onClick={() => setShowForm(true)}>
              새 게시글 작성
            </Button>
          </div>
          <PostList onEdit={handleEdit} />
        </div>

        {/* 게시글 작성/수정 폼 */}
        {showForm && (
          <div className='lg:col-span-1'>
            <div className='bg-gray-50 rounded-lg p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>
                  {editingPost ? '게시글 수정' : '새 게시글 작성'}
                </h2>
                <Button size='sm' variant='ghost' onClick={handleCancel}>
                  취소
                </Button>
              </div>
              <PostForm isLoading={isSubmitting} onSubmit={handleSubmit} />
            </div>
          </div>
        )}
      </div>

      {/* 기술 스택 정보 */}
      <div className='mt-12 p-6 bg-blue-50 rounded-lg'>
        <h3 className='text-lg font-semibold mb-3'>사용된 기술 스택</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-blue-500 rounded-full' />
            <span>SQLite</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-green-500 rounded-full' />
            <span>Prisma ORM</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-purple-500 rounded-full' />
            <span>Next.js 15</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-orange-500 rounded-full' />
            <span>TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  )
}
