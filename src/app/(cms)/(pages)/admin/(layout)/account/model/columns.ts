import { User } from '@prisma/client'

import {
  EditableTableColumn,
  EditableTableDialogColumn,
} from '@/app/(cms)/_shared/model'

export const columns: EditableTableColumn<User>[] = [
  {
    key: 'userId',
    title: '아이디',
  },
  {
    key: 'name',
    title: '이름',
  },
  {
    key: 'createdAt',
    title: '생성일',
    render: value => value.toLocaleString('ko-KR'),
  },
]

export const dialogColumns: EditableTableDialogColumn<
  User & { newPassword?: string; newPasswordConfirm?: string }
>[] = [
  {
    key: 'name',
    title: '이름',
    type: 'text',
    validation: value => {
      if (!value || String(value).trim().length === 0) {
        return '이름을 입력해주세요'
      }
      return null
    },
  },
  {
    key: 'newPassword',
    title: '새 비밀번호',
    type: 'password',
    validation: value => {
      if (!value || String(value).trim().length === 0) {
        return '비밀번호를 입력해주세요'
      }
      if (String(value).length < 8) {
        return '비밀번호는 8자 이상이어야 합니다'
      }
      return null
    },
  },
  {
    key: 'newPasswordConfirm',
    title: '새 비밀번호 확인',
    type: 'password',
    validation: (value, record) => {
      if (value !== record.newPassword) {
        return '비밀번호가 일치하지 않습니다'
      }
      return null
    },
  },
]
