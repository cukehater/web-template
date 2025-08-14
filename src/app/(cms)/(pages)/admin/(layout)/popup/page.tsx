'use client'

import { ColumnDef } from '@tanstack/react-table'

import { BasicTable } from '@/app/(cms)/_shared/ui'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<{
  id: string
  title: string
  startDate: string
  endDate: string
  isActive: boolean
}>[] = [
  {
    accessorKey: 'isActive',
    header: '노출 상태',
  },
  {
    accessorKey: 'title',
    header: '제목',
  },
  {
    accessorKey: 'startDate',
    header: '시작일',
  },
  {
    accessorKey: 'endDate',
    header: '종료일',
  },
]

const data: {
  id: string
  title: string
  startDate: string
  endDate: string
  isActive: boolean
}[] = [
  {
    id: '1',
    title: 'Popup 1',
    startDate: new Date().toLocaleDateString('ko-KR'),
    endDate: new Date().toLocaleDateString('ko-KR'),
    isActive: true,
  },
  {
    id: '1',
    title: 'Popup 1',
    startDate: new Date().toLocaleDateString('ko-KR'),
    endDate: new Date().toLocaleDateString('ko-KR'),
    isActive: true,
  },
  {
    id: '1',
    title: 'Popup 1',
    startDate: new Date().toLocaleDateString('ko-KR'),
    endDate: new Date().toLocaleDateString('ko-KR'),
    isActive: true,
  },
  {
    id: '1',
    title: 'Popup 1',
    startDate: new Date().toLocaleDateString('ko-KR'),
    endDate: new Date().toLocaleDateString('ko-KR'),
    isActive: true,
  },
  {
    id: '1',
    title: 'Popup 1',
    startDate: new Date().toLocaleDateString('ko-KR'),
    endDate: new Date().toLocaleDateString('ko-KR'),
    isActive: true,
  },
  {
    id: '1',
    title: 'Popup 1',
    startDate: new Date().toLocaleDateString('ko-KR'),
    endDate: new Date().toLocaleDateString('ko-KR'),
    isActive: true,
  },
  {
    id: '1',
    title: 'Popup 1',
    startDate: new Date().toLocaleDateString('ko-KR'),
    endDate: new Date().toLocaleDateString('ko-KR'),
    isActive: true,
  },
]

export default function Page() {
  // const popupList = await prisma.popup.findMany()
  return <BasicTable columns={columns} data={data} />
}
