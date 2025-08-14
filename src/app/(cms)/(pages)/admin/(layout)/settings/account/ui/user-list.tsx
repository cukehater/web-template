'use client'

import { User } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'

import { DialogEditableTable } from '@/app/(cms)/_shared/ui'

import { columns, dialogColumns } from '../model/columns'

export default function UserList({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [loading, setLoading] = useState(false)

  const handleSave = async (id: string, updatedData: Partial<User>) => {
    setLoading(true)
    const res = await fetch('/api/account', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })

    if (!res.ok) {
      toast.error('관리자 계정 정보 수정을 실패했습니다.', {
        position: 'top-right',
        richColors: true,
      })

      setLoading(false)
      return
    }

    setUsers(
      users.map(user =>
        user.id === id ? { ...user, name: updatedData.name || '' } : user,
      ),
    )

    toast.success('관리자 계정 정보 수정이 완료되었습니다.', {
      position: 'top-right',
      richColors: true,
    })

    setLoading(false)
  }

  return (
    <DialogEditableTable
      showAddButton
      addButtonText='새 계정 추가'
      columns={columns}
      data={users}
      dialogColumns={dialogColumns}
      dialogTitle='계정 정보 수정'
      loading={loading}
      title='관리자 계정 관리'
      onSave={handleSave}
    />
  )
}
