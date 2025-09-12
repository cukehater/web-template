'use client'

import { AccountType } from '@cms/shared/models'
import {
  Dialog,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@cms/shared/ui/shadcn'
import {
  TableCellActionDropdown,
  TableCellDate,
  TableCellText,
  TableEmptyData
} from '@cms/shared/ui/table'
import { Info, KeyRound, User } from 'lucide-react'
import React, { useState } from 'react'

import ModalTrigger from './modal-trigger'
import NameUpdateModal from './name-update-modal'
import PasswordUpdateModal from './password-update-modal'

export default function AccountTable({ accountData }: { accountData: AccountType[] }) {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({})

  const openDialog = (id: string) => {
    setOpenDialogs((prev) => ({ ...prev, [id]: true }))
  }

  const closeDialog = (id: string) => {
    setOpenDialogs((prev) => ({ ...prev, [id]: false }))
  }

  if (accountData.length === 0) return null

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead className="w-[125px]">생성일</TableHead>
              <TableHead className="w-[150px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!accountData || accountData.length === 0 ? (
              <TableEmptyData colSpan={4} />
            ) : (
              accountData.map((column) => (
                <TableRow key={column.id}>
                  <TableCellText text={column.accountId} />
                  <TableCellText text={column.name} />
                  <TableCellDate date={column.createdAt} />
                  <TableCellActionDropdown>
                    <ModalTrigger
                      icon={User}
                      title="이름 변경"
                      onOpen={() => openDialog(`${column.id}-name`)}
                    />
                    <ModalTrigger
                      icon={KeyRound}
                      title="비밀번호 변경"
                      onOpen={() => openDialog(`${column.id}-password`)}
                    />
                  </TableCellActionDropdown>
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

      {/* Dialogs */}
      {accountData.map((column) => {
        const key = `dialog-${column.id}`
        const passwordModalId = `${column.id}-password`
        const nameModalId = `${column.id}-name`

        return (
          <React.Fragment key={key}>
            <Dialog
              open={openDialogs[passwordModalId] || false}
              onOpenChange={(open) =>
                open ? openDialog(passwordModalId) : closeDialog(passwordModalId)
              }
            >
              <PasswordUpdateModal id={column.id} onClose={() => closeDialog(passwordModalId)} />
            </Dialog>
            <Dialog
              open={openDialogs[nameModalId] || false}
              onOpenChange={(open) => (open ? openDialog(nameModalId) : closeDialog(nameModalId))}
            >
              <NameUpdateModal id={column.id} onClose={() => closeDialog(nameModalId)} />
            </Dialog>
          </React.Fragment>
        )
      })}
    </>
  )
}
