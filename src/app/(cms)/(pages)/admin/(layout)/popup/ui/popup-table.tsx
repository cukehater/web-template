'use client'

import { Popup } from '@prisma/client'

import { EditableTable } from '@/app/(cms)/_shared/ui'

import { columns, dialogColumns } from '../model/columns'

export default function PopupTable({ initialData }: { initialData: Popup[] }) {
  return (
    <EditableTable
      columns={columns}
      data={initialData}
      dialogColumns={dialogColumns}
      dialogDescription='팝업 정보를 수정할 수 있습니다.'
      dialogTitle='팝업 관리'
      onDelete={() => {}}
      onSave={() => {}}
    />
  )
}
