import { apiGet } from '@cms/shared/api'
import { AccountType } from '@cms/shared/models'
import {
  Button,
  Dialog,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@cms/shared/shadcn'
import { PageTopTitle, TableCellDate, TableCellText, TableEmptyData } from '@cms/shared/ui'
import { KeyRound, UserCog2 } from 'lucide-react'

import PasswordUpdateModal from './password-update-modal'

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
                  <TableRow key={column.userId}>
                    <TableCellText text={column.userId} />
                    <TableCellText text={column.name} />
                    <TableCellDate date={column.createdAt} />
                    <TableCell className="text-center">
                      <Button asChild size="icon" variant="ghost">
                        <DialogTrigger asChild>
                          <Button className="flex items-center gap-2" size="icon" variant="outline">
                            <KeyRound className="size-4" />
                          </Button>
                        </DialogTrigger>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <PasswordUpdateModal />
      </Dialog>
    </>
  )
}
