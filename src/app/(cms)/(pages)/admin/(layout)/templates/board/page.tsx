'use client'

import { useState } from 'react'
import { EditableTable } from '@//app/(cms)/_features/editable-table'
import { EditableTableColumn } from '@//app/(cms)/_features/editable-table'

interface Board {
  id: string
  name: string
  description: string
  type: 'notice' | 'free' | 'gallery' | 'qna'
  status: 'active' | 'inactive'
  postCount: number
  createdAt: string
}

const initialBoards: Board[] = [
  {
    id: '1',
    name: '공지사항',
    description: '중요한 공지사항을 게시하는 게시판입니다.',
    type: 'notice',
    status: 'active',
    postCount: 15,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: '자유게시판',
    description: '자유롭게 의견을 나누는 게시판입니다.',
    type: 'free',
    status: 'active',
    postCount: 128,
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: '갤러리',
    description: '이미지를 중심으로 한 게시판입니다.',
    type: 'gallery',
    status: 'active',
    postCount: 45,
    createdAt: '2024-01-03',
  },
  {
    id: '4',
    name: 'Q&A',
    description: '질문과 답변을 위한 게시판입니다.',
    type: 'qna',
    status: 'inactive',
    postCount: 23,
    createdAt: '2024-01-04',
  },
]

const columns: EditableTableColumn<Board>[] = [
  {
    key: 'name',
    title: '게시판명',
    editable: true,
    type: 'text',
    validation: value => {
      if (!value || String(value).trim().length === 0) {
        return '게시판명을 입력해주세요'
      }
      if (String(value).length < 2) {
        return '게시판명은 2자 이상이어야 합니다'
      }
      return null
    },
  },
  {
    key: 'description',
    title: '설명',
    editable: true,
    type: 'text',
    validation: value => {
      if (!value || String(value).trim().length === 0) {
        return '설명을 입력해주세요'
      }
      return null
    },
  },
  {
    key: 'type',
    title: '유형',
    editable: true,
    type: 'select',
    options: [
      { label: '공지사항', value: 'notice' },
      { label: '자유게시판', value: 'free' },
      { label: '갤러리', value: 'gallery' },
      { label: 'Q&A', value: 'qna' },
    ],
    render: value => {
      const typeConfig = {
        notice: { label: '공지사항', className: 'bg-blue-100 text-blue-800' },
        free: { label: '자유게시판', className: 'bg-green-100 text-green-800' },
        gallery: {
          label: '갤러리',
          className: 'bg-purple-100 text-purple-800',
        },
        qna: { label: 'Q&A', className: 'bg-orange-100 text-orange-800' },
      }
      const config = typeConfig[value as keyof typeof typeConfig]
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${config.className}`}>
          {config.label}
        </span>
      )
    },
  },
  {
    key: 'status',
    title: '상태',
    editable: true,
    type: 'select',
    options: [
      { label: '활성', value: 'active' },
      { label: '비활성', value: 'inactive' },
    ],
    render: value => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value === 'active' ? '활성' : '비활성'}
      </span>
    ),
  },
  {
    key: 'postCount',
    title: '게시글 수',
    render: value => <span className='font-medium'>{value}개</span>,
  },
  {
    key: 'createdAt',
    title: '생성일',
    render: value => <span>{String(value)}</span>,
  },
]

export default function BoardPage() {
  const [boards, setBoards] = useState<Board[]>(initialBoards)
  const [loading, setLoading] = useState(false)

  const handleSave = async (id: string, updatedData: Partial<Board>) => {
    setLoading(true)
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 500))

      setBoards(
        boards.map(board =>
          board.id === id ? { ...board, ...updatedData } : board,
        ),
      )

      console.log('게시판 정보가 업데이트되었습니다:', { id, updatedData })
    } catch (error) {
      console.error('업데이트 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 500))

      setBoards(boards.filter(board => board.id !== id))

      console.log('게시판이 삭제되었습니다:', id)
    } catch (error) {
      console.error('삭제 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (newData: Omit<Board, 'id'>) => {
    setLoading(true)
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 500))

      const newBoard: Board = {
        ...newData,
        id: Date.now().toString(),
        postCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      }

      setBoards([...boards, newBoard])

      console.log('새 게시판이 추가되었습니다:', newBoard)
    } catch (error) {
      console.error('추가 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <EditableTable
        data={boards}
        columns={columns}
        onSave={handleSave}
        onDelete={handleDelete}
        onAdd={handleAdd}
        loading={loading}
        title='일반 게시판 관리'
        showAddButton={true}
        addButtonText='새 게시판 추가'
      />
    </div>
  )
}
