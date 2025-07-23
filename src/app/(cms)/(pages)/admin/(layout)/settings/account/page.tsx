'use client'

import { useState } from 'react'

import { EditableTable } from '@//app/(cms)/_features/editable-table'
import { EditableTableColumn } from '@//app/(cms)/_features/editable-table'
import { User as UserType } from '@/app/(cms)/_shared/model'

interface User extends UserType {
  createdAt: string
}

const initialUsers: User[] = [
  {
    id: '1',
    userId: 'admin1',
    name: '관리자',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    userId: 'admin2',
    name: '사용자1',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    userId: 'admin3',
    name: '사용자2',
    createdAt: '2024-01-03',
  },
]

const columns: EditableTableColumn<User>[] = [
  {
    key: 'userId',
    title: '아이디',
    editable: true,
    type: 'text',
    validation: value => {
      if (!value || String(value).trim().length === 0) {
        return '아이디를 입력해주세요'
      }
      if (String(value).length < 2) {
        return '아이디는 2자 이상이어야 합니다'
      }
      return null
    },
  },
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
        showAddButton
        addButtonText='새 계정 추가'
        columns={columns}
        data={users}
        loading={loading}
        title='관리자 계정 관리'
        onAdd={handleAdd}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </div>
  )
}
