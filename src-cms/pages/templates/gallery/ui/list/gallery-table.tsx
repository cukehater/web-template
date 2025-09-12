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
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@cms/shared/ui/shadcn'
import {
  TableCellActionDropdown,
  TableCellDate,
  TableCellNumberText,
  TableCellOrderButtons,
  TableCellStatusIndicator,
  TableCellText,
  TableCellThumbnailImage,
  TableCellTitle,
  TableEmptyData
} from '@cms/shared/ui/table'
import { Gallery } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function GalleryTable({
  initialData,
  pagination,
  currentPage,
  currentLimit
}: TableListPropsType<Gallery>) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(initialData)
  const [paginationInfo, setPaginationInfo] = useState(pagination)

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true)
      const { data, pagination } = (await fetchTableData({
        table: 'gallery',
        page: currentPage,
        limit: currentLimit
      })) as TableDataResponseType<Gallery>

      setData(data)
      setPaginationInfo(pagination)
    } catch {
      errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    } finally {
      setIsFetching(false)
    }
  }, [currentPage, currentLimit])

  const handleEdit = (id: string) => {
    router.push(`../templates/gallery/edit/${id}`)
  }

  const handleUpdate = async (handler: () => void): Promise<void> => {
    if (isUpdating) return

    setIsUpdating(true)
    try {
      await handler()
    } finally {
      setIsUpdating(false)
    }
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
              <TableHead className="w-[75px]">순서</TableHead>
              <TableHead className="w-[100px]">상태</TableHead>
              <TableHead className="w-[100px]">이미지</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[100px]">작성자</TableHead>
              <TableHead className="w-[100px]">작성일</TableHead>
              <TableHead className="w-[80px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || data.length === 0 ? (
              <TableEmptyData colSpan={7} />
            ) : (
              data
                .sort((a, b) => b.order - a.order)
                .map((column) => (
                  <TableRow key={column.id}>
                    {/* 인덱스 */}
                    <TableCellNumberText
                      text={(paginationInfo.total + 1 - column.order).toString()}
                    />

                    {/* 순서 */}
                    <TableCellOrderButtons
                      onOrderChangeDown={() =>
                        handleUpdate(() =>
                          handleTableOrderChange({
                            table: 'gallery',
                            id: column.id,
                            currentOrder: column.order,
                            direction: 'down',
                            totalCount: paginationInfo.total,
                            onSuccess: fetchData
                          })
                        )
                      }
                      onOrderChangeUp={() =>
                        handleUpdate(() =>
                          handleTableOrderChange({
                            table: 'gallery',
                            id: column.id,
                            currentOrder: column.order,
                            direction: 'up',
                            totalCount: paginationInfo.total,
                            onSuccess: fetchData
                          })
                        )
                      }
                    />

                    {/* 상태 */}
                    <TableCellStatusIndicator
                      activeText="활성"
                      currentStatus={column.isVisible}
                      inactiveText="비활성"
                    />

                    {/* 이미지 */}
                    <TableCellThumbnailImage
                      alt={column.title}
                      thumbnail={column.thumbnail}
                      visibleStatus={column.isVisible}
                    />

                    {/* 제목 */}
                    <TableCellTitle title={column.title} />

                    {/* 작성자 */}
                    <TableCellText text={column.writer} />

                    {/* 작성일 */}
                    <TableCellDate date={column.createdAt} />

                    {/* 작업 */}
                    <TableCellActionDropdown
                      disabled={isFetching}
                      visibleStatus={column.isVisible}
                      onDelete={() => {
                        handleUpdate(() =>
                          handleTableItemDelete({
                            table: 'gallery',
                            id: column.id,
                            order: column.order,
                            onSuccess: fetchData
                          })
                        )
                      }}
                      onEdit={() => handleEdit(column.id)}
                      onToggleVisible={() =>
                        handleUpdate(() =>
                          handleTableVisibleToggle({
                            table: 'gallery',
                            id: column.id,
                            isVisible: column.isVisible,
                            onSuccess: () => visibleToggleSuccess<Gallery>(setData, column.id)
                          })
                        )
                      }
                    />
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination paginationInfo={paginationInfo} />
    </>
  )
}
