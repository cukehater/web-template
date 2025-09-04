'use client'

import { Pagination } from '@cms/features/pagination'
import { RowAmountSelector } from '@cms/features/row-amount-selector'
import {
  handleTableItemDelete,
  handleTableOrderChange,
  handleTableVisibleToggle,
  visibleToggleSuccess
} from '@cms/features/table-handler'
import { fetchTableData } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast } from '@cms/shared/lib'
import { TableDataResponseType, TableListPropsType } from '@cms/shared/models'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@cms/shared/shadcn'
import {
  TableActionDropdown,
  TableCellTitle,
  TableDate,
  TableEmptyData,
  TableNumberText,
  TableOrderButtons,
  TableStatusIndicator
} from '@cms/shared/ui'
import { General } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function GeneralTable({
  initialData,
  pagination,
  currentPage,
  currentLimit
}: TableListPropsType<General>) {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(initialData)
  const [paginationInfo, setPaginationInfo] = useState(pagination)

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true)
      const { data, pagination } = (await fetchTableData({
        table: 'general',
        page: currentPage,
        limit: currentLimit
      })) as TableDataResponseType<General>

      setData(data)
      setPaginationInfo(pagination)
    } catch {
      errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    } finally {
      setIsFetching(false)
    }
  }, [currentPage, currentLimit])

  const handleEdit = (id: string) => {
    router.push(`../templates/general/edit/${id}`)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <RowAmountSelector currentLimit={currentLimit} />

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">번호</TableHead>
              <TableHead className="w-[75px]">순서 정렬</TableHead>
              <TableHead className="w-[100px]">상태</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[120px]">작성일</TableHead>
              <TableHead className="w-[100px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .sort((a, b) => b.order - a.order)
              .map((column) => (
                <TableRow key={column.id}>
                  {/* 인덱스 */}
                  <TableCell>
                    <TableNumberText text={(paginationInfo.total + 1 - column.order).toString()} />
                  </TableCell>

                  {/* 순서 */}
                  <TableCell>
                    <TableOrderButtons
                      onOrderChangeDown={async () =>
                        await handleTableOrderChange({
                          table: 'general',
                          id: column.id,
                          currentOrder: column.order,
                          direction: 'down',
                          totalCount: paginationInfo.total,
                          onSuccess: fetchData
                        })
                      }
                      onOrderChangeUp={async () =>
                        await handleTableOrderChange({
                          table: 'general',
                          id: column.id,
                          currentOrder: column.order,
                          direction: 'up',
                          totalCount: paginationInfo.total,
                          onSuccess: fetchData
                        })
                      }
                    />
                  </TableCell>

                  {/* 상태 */}
                  <TableCell>
                    <TableStatusIndicator
                      activeText="활성"
                      currentStatus={column.isVisible}
                      inactiveText="비활성"
                    />
                  </TableCell>

                  {/* 제목 */}
                  <TableCell>
                    <TableCellTitle title={column.title} />
                  </TableCell>

                  {/* 작성일 */}
                  <TableCell>
                    <TableDate date={column.createdAt} />
                  </TableCell>

                  {/* 작업 */}
                  <TableCell>
                    <TableActionDropdown
                      disabled={isFetching}
                      visibleStatus={column.isVisible}
                      onDelete={async () =>
                        await handleTableItemDelete({
                          table: 'general',
                          id: column.id,
                          order: column.order,
                          onSuccess: fetchData
                        })
                      }
                      onEdit={() => handleEdit(column.id)}
                      onToggleVisible={async () =>
                        await handleTableVisibleToggle({
                          table: 'general',
                          id: column.id,
                          isVisible: column.isVisible,
                          onSuccess: () => visibleToggleSuccess<General>(setData, column.id)
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            {data.length === 0 && <TableEmptyData colSpan={7} />}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination paginationInfo={paginationInfo} />
    </>
  )
}
