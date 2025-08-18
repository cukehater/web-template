'use client'

import { User } from '@prisma/client'

import { EditableTable } from '@/app/(cms)/_shared/ui'

import { columns, dialogColumns } from '../model/columns'
import { useEditAccount } from '../model/useEditAccount'

export default function AccountTable({
  initialUsers,
}: {
  initialUsers: User[]
}) {
  const { users, handleSave } = useEditAccount(initialUsers)

  return (
    <EditableTable
      columns={columns}
      data={users as unknown as User[]}
      dialogColumns={dialogColumns}
      dialogDescription='관리자 계정 정보를 수정할 수 있습니다.'
      dialogTitle='계정 정보 수정'
      onSave={handleSave}
    />
  )
}
