'use client'

import { useEffect, useState } from 'react'

import { Button } from '@//app/(cms)/_shared/shadcn/button'

import { Post } from '../model/types'

interface PostListProps {
  onEdit?: (post: Post) => void
  onDelete?: (id: string) => Promise<void>
}

export function PostList({ onEdit, onDelete }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      if (!response.ok) {
        throw new Error('게시글을 불러오는데 실패했습니다.')
      }
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('게시글 삭제에 실패했습니다.')
      }

      await fetchPosts() // 목록 새로고침
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='animate-pulse'>
            <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
            <div className='h-3 bg-gray-200 rounded w-1/2' />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-600 mb-4'>{error}</p>
        <Button variant='outline' onClick={fetchPosts}>
          다시 시도
        </Button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        등록된 게시글이 없습니다.
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {posts.map(post => (
        <div
          key={post.id}
          className='border rounded-lg p-4 hover:shadow-md transition-shadow'
        >
          <div className='flex justify-between items-start mb-2'>
            <h3 className='text-lg font-semibold'>{post.title}</h3>
            <div className='flex gap-2'>
              {onEdit && (
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => onEdit(post)}
                >
                  수정
                </Button>
              )}
              <Button
                size='sm'
                variant='destructive'
                onClick={() => handleDelete(post.id)}
              >
                삭제
              </Button>
            </div>
          </div>
          <p className='text-gray-600 text-sm mb-2 line-clamp-2'>
            {post.content}
          </p>
          <div className='flex justify-between items-center text-xs text-gray-500'>
            <span>작성자: {post.author}</span>
            <div className='flex items-center gap-4'>
              <span>
                {post.isPublished ? (
                  <span className='text-green-600'>발행됨</span>
                ) : (
                  <span className='text-yellow-600'>임시저장</span>
                )}
              </span>
              <span>
                {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
