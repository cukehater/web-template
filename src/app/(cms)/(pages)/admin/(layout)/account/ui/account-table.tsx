'use client'

import { User } from '@prisma/client'

import { DialogEditableTable } from '@/app/(cms)/_shared/ui'

import { columns, dialogColumns } from '../model/columns'
import { useEditAccount } from '../model/useEditAccount'

export default function AccountTable({
  initialUsers,
}: {
  initialUsers: User[]
}) {
  const { users, handleSave } = useEditAccount(initialUsers)

  return (
    <DialogEditableTable
      showAddButton
      addButtonText='새 계정 추가'
      columns={columns}
      data={users as unknown as User[]}
      dialogColumns={dialogColumns}
      dialogTitle='계정 정보 수정'
      title='관리자 계정 관리'
      onSave={handleSave}
    />
  )
}
