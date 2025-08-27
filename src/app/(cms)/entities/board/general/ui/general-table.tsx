'use client'

import { General } from '@prisma/client'
import { useEffect } from 'react'

import { useTableOperations } from '@/app/(cms)/shared/hooks/use-table-operations'
import { PaginationInfo } from '@/app/(cms)/shared/model'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(cms)/shared/shadcn'
import {
  PaginationContainer,
  TableActionDropdown,
  TableCellTitle,
  TableDate,
  TableEmptyData,
  TableNumberText,
  TableOrderButtons,
  TableRowsSelect,
  TableStatusIndicator,
} from '@/app/(cms)/shared/ui'

export default function GeneralTable({
  currentLimit,
  currentPage,
  initialData,
  pagination,
}: {
  currentLimit: number
  currentPage: number
  initialData: General[]
  pagination: PaginationInfo
}) {
  const {
    data,
    paginationInfo,
    handleOrderChange,
    handleToggleVisible,
    handleDelete,
    handleEdit,
    refreshData,
  } = useTableOperations({
    initialData,
    pagination,
    currentPage,
    currentLimit,
    apiEndpoint: '/api/board/general',
    editPath: '../templates/general/edit',
  })

  // 페이지 변경 시 데이터 새로고침
  useEffect(() => {
    refreshData()
  }, [currentPage, currentLimit, refreshData])

  return (
    <>
      {/* 노출 개수 선택 */}
      <TableRowsSelect currentLimit={currentLimit.toString()} />

      {/* 테이블 */}
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>번호</TableHead>
              <TableHead className='w-[75px]'>순서 정렬</TableHead>
              <TableHead className='w-[100px]'>상태</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className='w-[120px]'>작성일</TableHead>
              <TableHead className='w-[100px]'>작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .sort((a, b) => b.order - a.order)
              .map(column => (
                <TableRow key={column.id}>
                  {/* 인덱스 */}
                  <TableCell>
                    <TableNumberText
                      text={(
                        paginationInfo.total +
                        1 -
                        column.order
                      ).toString()}
                    />
                  </TableCell>

                  {/* 순서 */}
                  <TableCell>
                    <TableOrderButtons
                      onOrderChangeDown={() =>
                        handleOrderChange(column.id, column.order, 'down')
                      }
                      onOrderChangeUp={() =>
                        handleOrderChange(column.id, column.order, 'up')
                      }
                    />
                  </TableCell>

                  {/* 상태 */}
                  <TableCell>
                    <TableStatusIndicator
                      activeText='활성'
                      currentStatus={column.isVisible}
                      inactiveText='비활성'
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
                      visibleStatus={column.isVisible}
                      onDelete={() => handleDelete(column.id)}
                      onEdit={() => handleEdit(column.id)}
                      onToggleVisible={() =>
                        handleToggleVisible(column.id, column.isVisible)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            {data.length === 0 && <TableEmptyData colSpan={6} />}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <PaginationContainer paginationInfo={paginationInfo} />
    </>
  )
}
