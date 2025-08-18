import { Popup } from '@prisma/client'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

import {
  EditableTableColumn,
  EditableTableDialogColumn,
} from '@/app/(cms)/_shared/model'

export const columns: EditableTableColumn<Popup>[] = [
  {
    key: 'isActive',
    title: '노출 여부',
    width: '70px',
    render: value =>
      value ? (
        <Eye className='size-4 inline-block' />
      ) : (
        <EyeOff className='size-4 inline-block' />
      ),
  },
  {
    key: 'imageUrl',
    title: '이미지',
    width: '100px',
    render: value => (
      <Image alt='popup' height={100} src={value as string} width={100} />
    ),
  },
  {
    key: 'title',
    title: '제목',
  },
  {
    key: 'startDate',
    width: '100px',
    title: '시작 시간',
  },
  {
    key: 'endDate',
    width: '100px',
    title: '종료 시간',
  },
]

export const dialogColumns: EditableTableDialogColumn<Popup>[] = [
  {
    key: 'isActive',
    title: '노출 여부',
    type: 'switch',
  },
  {
    key: 'title',
    title: '제목',
    type: 'text',
  },
  {
    key: 'imageUrl',
    title: '이미지',
    type: 'image',
  },
  {
    key: 'width',
    title: '너비',
    type: 'number',
    isHalf: true,
    validation: value => {
      if (Number(value) > 600) {
        return '최대 너비는 600px를 초과할 수 없습니다.'
      }
      return null
    },
  },
  {
    key: 'height',
    title: '높이',
    type: 'number',
    isHalf: true,
    validation: value => {
      if (Number(value) > 1000) {
        return '최대 높이는 1000px를 초과할 수 없습니다.'
      }
      return null
    },
  },
  {
    key: 'x',
    title: 'X 좌표',
    type: 'number',
    isHalf: true,
  },
  {
    key: 'y',
    title: 'Y 좌표',
    type: 'number',
    isHalf: true,
  },
  {
    key: 'zIndex',
    title: 'Z 순서',
    type: 'number',
  },
  {
    key: 'startDate',
    title: '시작일',
    type: 'date',
    isHalf: true,
  },
  {
    key: 'endDate',
    title: '종료일',
    type: 'date',
    isHalf: true,
  },
]
