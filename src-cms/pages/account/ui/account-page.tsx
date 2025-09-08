import { apiGet } from '@cms/shared/api'
import { AccountType } from '@cms/shared/models'
import {
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@cms/shared/shadcn'
import { PageTopTitle, TableCellDate, TableCellText, TableEmptyData } from '@cms/shared/ui'
import { Info, UserCog2 } from 'lucide-react'

import PasswordUpdateTrigger from './password-update-trigger'

export default async function AccountPage() {
  const { data } = await apiGet<AccountType[]>('/api/account')

  return (
    <>
      <PageTopTitle
        description="사이트 관리자 계정을 관리합니다."
        icon={UserCog2}
        title="관리자 계정 관리"
      />

      <Dialog>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead className="w-[125px]">생성일</TableHead>
                <TableHead className="w-[150px]">비밀번호 변경</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!data || data.length === 0 ? (
                <TableEmptyData colSpan={4} />
              ) : (
                data.map((column) => (
                  <TableRow key={column.id}>
                    <TableCellText text={column.accountId} />
                    <TableCellText text={column.name} />
                    <TableCellDate date={column.createdAt} />
                    <TableCell className="text-center">
                      <PasswordUpdateTrigger id={column.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <p className="flex items-center justify-end gap-1 text-right text-xs text-muted-foreground">
          <Info className="size-3" />
          추가 관리자 계정을 생성하려면 별도로 문의 바랍니다.
        </p>
      </Dialog>
    </>
  )
}
