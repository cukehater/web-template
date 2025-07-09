'use client'

import { useState } from 'react'
import { EditableTable } from '@/app/(cms)/_features/editable-table'
import { EditableTableColumn } from '@/app/(cms)/_features/editable-table'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  createdAt: string
}

const initialUsers: User[] = [
  {
    id: '1',
    name: '관리자',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: '사용자1',
    email: 'user1@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: '사용자2',
    email: 'user2@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-03',
  },
]

const columns: EditableTableColumn<User>[] = [
  {
    key: 'name',
    title: '이름',
    editable: true,
    type: 'text',
    validation: value => {
      if (!value || String(value).trim().length === 0) {
        return '이름을 입력해주세요'
      }
      if (String(value).length < 2) {
        return '이름은 2자 이상이어야 합니다'
      }
      return null
    },
  },
  {
    key: 'email',
    title: '이메일',
    editable: true,
    type: 'text',
    validation: value => {
      if (!value || String(value).trim().length === 0) {
        return '이메일을 입력해주세요'
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(String(value))) {
        return '올바른 이메일 형식을 입력해주세요'
      }
      return null
    },
  },
  {
    key: 'role',
    title: '역할',
    editable: true,
    type: 'select',
    options: [
      { label: '관리자', value: 'admin' },
      { label: '사용자', value: 'user' },
    ],
    render: value => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          value === 'admin'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {value === 'admin' ? '관리자' : '사용자'}
      </span>
    ),
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
    key: 'createdAt',
    title: '생성일',
    render: value => <span>{String(value)}</span>,
  },
]

export default function AccountPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [loading, setLoading] = useState(false)

  const handleSave = async (id: string, updatedData: Partial<User>) => {
    setLoading(true)
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 500))

      setUsers(
        users.map(user =>
          user.id === id ? { ...user, ...updatedData } : user,
        ),
      )

      console.log('사용자 정보가 업데이트되었습니다:', { id, updatedData })
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

      setUsers(users.filter(user => user.id !== id))

      console.log('사용자가 삭제되었습니다:', id)
    } catch (error) {
      console.error('삭제 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (newData: Omit<User, 'id'>) => {
    setLoading(true)
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 500))

      const newUser: User = {
        ...newData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      }

      setUsers([...users, newUser])

      console.log('새 사용자가 추가되었습니다:', newUser)
    } catch (error) {
      console.error('추가 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <EditableTable
        data={users}
        columns={columns}
        onSave={handleSave}
        onDelete={handleDelete}
        onAdd={handleAdd}
        loading={loading}
        title='관리자 계정 관리'
        showAddButton={true}
        addButtonText='새 계정 추가'
      />
    </div>
  )
}
