'use client'

import { useState } from 'react'
import { Button } from '@/app/(cms)/_shared/ui'
import { Input } from '@/app/(cms)/_shared/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(cms)/_shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/(cms)/_shared/ui'
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Save,
  X,
  Plus,
  Image,
  Eye,
} from 'lucide-react'

interface GalleryPost {
  id: string
  title: string
  description: string
  imageUrl: string
  category: 'nature' | 'city' | 'portrait' | 'abstract'
  status: 'published' | 'draft' | 'archived'
  viewCount: number
  createdAt: string
  updatedAt: string
}

const initialGalleryPosts: GalleryPost[] = [
  {
    id: '1',
    title: '자연의 아름다움',
    description: '산과 강이 어우러진 자연 풍경',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    category: 'nature',
    status: 'published',
    viewCount: 1250,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: '도시의 밤',
    description: '불이 켜진 도시의 야경',
    imageUrl:
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop',
    category: 'city',
    status: 'published',
    viewCount: 890,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-10',
  },
  {
    id: '3',
    title: '인물 사진',
    description: '자연스러운 인물 포트레이트',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    category: 'portrait',
    status: 'draft',
    viewCount: 0,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-05',
  },
  {
    id: '4',
    title: '추상적 표현',
    description: '색채와 형태의 추상적 조화',
    imageUrl:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
    category: 'abstract',
    status: 'archived',
    viewCount: 567,
    createdAt: '2024-01-04',
    updatedAt: '2024-01-20',
  },
]

export default function GalleryPage() {
  const [posts, setPosts] = useState<GalleryPost[]>(initialGalleryPosts)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<GalleryPost>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleEdit = (post: GalleryPost) => {
    setEditingId(post.id)
    setEditData(post)
    setErrors({})
  }

  const handleSave = (id: string) => {
    // 유효성 검사
    const newErrors: Record<string, string> = {}

    if (!editData.title || String(editData.title).trim().length === 0) {
      newErrors.title = '제목을 입력해주세요'
    }

    if (
      !editData.description ||
      String(editData.description).trim().length === 0
    ) {
      newErrors.description = '설명을 입력해주세요'
    }

    if (!editData.imageUrl || String(editData.imageUrl).trim().length === 0) {
      newErrors.imageUrl = '이미지 URL을 입력해주세요'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setPosts(
      posts.map(post =>
        post.id === id
          ? {
              ...post,
              ...editData,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : post,
      ),
    )
    setEditingId(null)
    setEditData({})
    setErrors({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
    setErrors({})
  }

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleInputChange = (field: keyof GalleryPost, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getCategoryConfig = (category: string) => {
    const configs = {
      nature: { label: '자연', className: 'bg-green-100 text-green-800' },
      city: { label: '도시', className: 'bg-blue-100 text-blue-800' },
      portrait: { label: '인물', className: 'bg-purple-100 text-purple-800' },
      abstract: { label: '추상', className: 'bg-orange-100 text-orange-800' },
    }
    return configs[category as keyof typeof configs] || configs.nature
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      published: { label: '발행됨', className: 'bg-green-100 text-green-800' },
      draft: { label: '임시저장', className: 'bg-yellow-100 text-yellow-800' },
      archived: { label: '보관됨', className: 'bg-gray-100 text-gray-800' },
    }
    return configs[status as keyof typeof configs] || configs.draft
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>갤러리 게시판 관리</h1>
          <p className='text-muted-foreground mt-1'>
            이미지 중심의 갤러리 게시판을 관리합니다
          </p>
        </div>
        <Button>
          <Plus className='mr-2 h-4 w-4' />새 게시물 추가
        </Button>
      </div>

      <div className='rounded-lg border bg-card'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>이미지</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>설명</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>조회수</TableHead>
              <TableHead>생성일</TableHead>
              <TableHead className='w-[80px]'>작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map(post => {
              const isEditing = editingId === post.id

              return (
                <TableRow key={post.id}>
                  <TableCell>
                    {isEditing ? (
                      <div className='space-y-2'>
                        <Input
                          value={editData.imageUrl || post.imageUrl}
                          onChange={e =>
                            handleInputChange('imageUrl', e.target.value)
                          }
                          placeholder='이미지 URL'
                          className='w-full'
                        />
                        {errors.imageUrl && (
                          <p className='text-xs text-red-500'>
                            {errors.imageUrl}
                          </p>
                        )}
                        <div className='relative w-20 h-20 rounded-md overflow-hidden border'>
                          <img
                            src={editData.imageUrl || post.imageUrl}
                            alt='미리보기'
                            className='w-full h-full object-cover'
                            onError={e => {
                              e.currentTarget.src =
                                'https://via.placeholder.com/80x80?text=이미지+없음'
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className='relative w-20 h-20 rounded-md overflow-hidden border'>
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className='w-full h-full object-cover'
                          onError={e => {
                            e.currentTarget.src =
                              'https://via.placeholder.com/80x80?text=이미지+없음'
                          }}
                        />
                        <div className='absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center'>
                          <Eye className='w-5 h-5 text-white opacity-0 hover:opacity-100 transition-opacity' />
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <div className='space-y-1'>
                        <Input
                          value={editData.title || post.title}
                          onChange={e =>
                            handleInputChange('title', e.target.value)
                          }
                          className='w-full'
                        />
                        {errors.title && (
                          <p className='text-xs text-red-500'>{errors.title}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className='font-medium'>{post.title}</p>
                        <p className='text-sm text-muted-foreground'>
                          {post.updatedAt !== post.createdAt
                            ? '수정됨'
                            : '신규'}
                        </p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <div className='space-y-1'>
                        <textarea
                          value={editData.description || post.description}
                          onChange={e =>
                            handleInputChange('description', e.target.value)
                          }
                          className='w-full p-2 border rounded-md text-sm resize-none'
                          rows={3}
                        />
                        {errors.description && (
                          <p className='text-xs text-red-500'>
                            {errors.description}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className='text-sm text-muted-foreground line-clamp-2'>
                        {post.description}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <select
                        value={editData.category || post.category}
                        onChange={e =>
                          handleInputChange('category', e.target.value)
                        }
                        className='w-full p-2 border rounded-md text-sm'
                      >
                        <option value='nature'>자연</option>
                        <option value='city'>도시</option>
                        <option value='portrait'>인물</option>
                        <option value='abstract'>추상</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          getCategoryConfig(post.category).className
                        }`}
                      >
                        {getCategoryConfig(post.category).label}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <select
                        value={editData.status || post.status}
                        onChange={e =>
                          handleInputChange('status', e.target.value)
                        }
                        className='w-full p-2 border rounded-md text-sm'
                      >
                        <option value='published'>발행됨</option>
                        <option value='draft'>임시저장</option>
                        <option value='archived'>보관됨</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          getStatusConfig(post.status).className
                        }`}
                      >
                        {getStatusConfig(post.status).label}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className='font-medium'>
                      {post.viewCount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      <p>{post.createdAt}</p>
                      {post.updatedAt !== post.createdAt && (
                        <p className='text-muted-foreground'>
                          수정: {post.updatedAt}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <div className='flex gap-1'>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleSave(post.id)}
                          className='h-8 w-8 p-0'
                        >
                          <Save className='h-4 w-4' />
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={handleCancel}
                          className='h-8 w-8 p-0'
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleEdit(post)}>
                            <Pencil className='mr-2 h-4 w-4' />
                            편집
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className='mr-2 h-4 w-4' />
                            미리보기
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(post.id)}
                            className='text-red-600'
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* 갤러리 뷰 토글 버튼 */}
      <div className='flex justify-center'>
        <Button variant='outline' className='w-full max-w-xs'>
          <Image className='mr-2 h-4 w-4' />
          갤러리 뷰로 보기
        </Button>
      </div>
    </div>
  )
}
