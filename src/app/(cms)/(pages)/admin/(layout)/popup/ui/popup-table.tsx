'use client'

import { Popup } from '@prisma/client'

import { EditableTable } from '@/app/(cms)/_shared/ui'

import { columns, dialogColumns } from '../model/columns'

export default function PopupTable({ initialData }: { initialData: Popup[] }) {
  const data = [
    {
      id: '1',
      isActive: true,
      imageUrl:
        'https://images.unsplash.com/photo-1754925037488-eccfe6792b4a?q=80&w=1657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '팝업 제목',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-01'),
      width: 600,
      height: 1000,
      x: 100,
      y: 100,
      zIndex: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      isActive: false,
      imageUrl:
        'https://images.unsplash.com/photo-1754925037488-eccfe6792b4a?q=80&w=1657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '팝업 제목',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-01'),
      width: 600,
      height: 1000,
      x: 200,
      y: 200,
      zIndex: 1001,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      isActive: true,
      imageUrl:
        'https://images.unsplash.com/photo-1754925037488-eccfe6792b4a?q=80&w=1657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '팝업 제목',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-01'),
      width: 600,
      height: 1000,
      x: 300,
      y: 300,
      zIndex: 1002,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      isActive: true,
      imageUrl:
        'https://images.unsplash.com/photo-1754925037488-eccfe6792b4a?q=80&w=1657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '팝업 제목',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-01'),
      width: 600,
      height: 1000,
      x: 400,
      y: 400,
      zIndex: 1003,
    },
    {
      id: '5',
      isActive: true,
      imageUrl:
        'https://images.unsplash.com/photo-1754925037488-eccfe6792b4a?q=80&w=1657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '팝업 제목',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-01'),
      width: 600,
      height: 1000,
      x: 500,
      y: 500,
      zIndex: 1004,
    },
    {
      id: '6',
      isActive: true,
      imageUrl:
        'https://images.unsplash.com/photo-1754925037488-eccfe6792b4a?q=80&w=1657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '팝업 제목',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-01'),
      width: 600,
      height: 1000,
      x: 600,
      y: 600,
      zIndex: 1005,
    },
  ]

  return (
    <EditableTable
      columns={columns}
      // data={initialData}
      data={data as unknown as Popup[]}
      dialogColumns={dialogColumns}
      dialogDescription='팝업 정보를 수정할 수 있습니다.'
      dialogTitle='팝업 관리'
      onDelete={() => {}}
      onSave={() => {}}
    />
  )
}
