'use client'

import { User } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'

export const useEditAccount = (initialUsers: User[]) => {
  const [users, setUsers] = useState(initialUsers)

  const handleSave = async (id: string, updatedData: Partial<User>) => {
    const res = await fetch('/api/account', {
      method: 'PATCH',
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })

    if (!res.ok) {
      toast.error('관리자 계정 정보 수정에 실패했습니다.', {
        position: 'top-right',
        richColors: true,
      })

      return
    }

    setUsers(
      users.map(user =>
        user.id === id ? { ...user, name: updatedData.name || '' } : user,
      ),
    )

    toast.success('관리자 계정 정보가 수정되었습니다.', {
      position: 'top-right',
      richColors: true,
    })
  }

  return {
    users,
    handleSave,
  }
}
