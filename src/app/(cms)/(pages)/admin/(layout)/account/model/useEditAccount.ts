'use client'

import { User } from '@prisma/client'
import { useState } from 'react'

import { errorToast, successToast } from '@/app/(cms)/_shared/lib'

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
      errorToast('관리자 계정 정보 수정에 실패했습니다.')
      return
    }

    setUsers(
      users.map(user =>
        user.id === id ? { ...user, name: updatedData.name || '' } : user,
      ),
    )

    successToast('관리자 계정 정보가 수정되었습니다.')
  }

  return {
    users,
    handleSave,
  }
}
