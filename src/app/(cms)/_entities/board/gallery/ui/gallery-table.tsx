'use client'

import { Eye } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  ALERT_MESSAGE,
  errorToast,
  infoToast,
  successToast,
} from '@/app/(cms)/_shared/lib'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(cms)/_shared/shadcn'
import {
  TableActionDropdown,
  TableCellTitle,
  TableEmptyData,
  TableNumberText,
  TableOrderButtons,
  TableStatusIndicator,
  TableThumbnailImage,
} from '@/app/(cms)/_shared/ui'
import TableDate from '@/app/(cms)/_shared/ui/table/table-date'

import { GalleryTableProps } from '../model/types'

export default function GalleryTable({
  initialData,
  pagination,
  currentPage,
  currentLimit,
}: GalleryTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState(initialData)
  const [paginationInfo, setPaginationInfo] = useState(pagination)
  const [isSorting, setIsSorting] = useState(false)

  // 페이지 변경 시 데이터 새로고침
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/gallery?page=${currentPage}&limit=${currentLimit}`,
        )
        const result = await response.json()
        setData(result.data)
        setPaginationInfo(result.pagination)
      } catch {
        errorToast(ALERT_MESSAGE.REQUEST_ERROR)
      }
    }

    fetchData()
  }, [currentPage, currentLimit])

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  // 노출 개수 변경 함수
  const handleLimitChange = (limit: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', limit.toString())
    params.set('page', '1') // 노출 개수 변경 시 첫 페이지로 이동
    router.push(`?${params.toString()}`)
  }

  // 순서 변경
  const handleOrderChange = async (
    id: string,
    currentOrder: number,
    direction: 'up' | 'down',
  ) => {
    if (isSorting) return

    const isFirstItem = currentOrder === paginationInfo.total
    const isLastItem = currentOrder === 1
    const newOrder = direction === 'up' ? currentOrder + 1 : currentOrder - 1

    if (
      (direction === 'up' && isFirstItem) ||
      (direction === 'down' && isLastItem)
    ) {
      const message =
        direction === 'up'
          ? ALERT_MESSAGE.ORDER_CHANGE_FIRST
          : ALERT_MESSAGE.ORDER_CHANGE_LAST
      infoToast(message)
      return
    }

    try {
      setIsSorting(true)
      const { data: siblingData } = await fetch('/api/gallery?type=order', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          currentOrder,
          newOrder,
          direction,
        }),
      }).then(res => res.json())

      setData(prev => {
        const targetIdx = prev.findIndex(item => item.id === id)
        const siblingIdx = prev.findIndex(item => item.id === siblingData.id)

        // 새로운 배열을 생성하여 불변성 유지
        const newData = [...prev]
        newData[targetIdx] = { ...siblingData, order: currentOrder }
        newData[siblingIdx] = { ...prev[targetIdx], order: newOrder }

        return newData
      })
    } catch {
      errorToast(ALERT_MESSAGE.REQUEST_ERROR)
    } finally {
      setIsSorting(false)
    }
  }

  // 활성 상태 변경
  const handleToggleVisible = async (id: string, isVisible: boolean) => {
    try {
      await fetch(`/api/gallery?type=visible`, {
        method: 'PUT',
        body: JSON.stringify({
          id,
          isVisible: !isVisible,
        }),
      })

      setData(prev => {
        return prev.map(item => {
          if (item.id === id) {
            return { ...item, isVisible: !item.isVisible }
          }
          return item
        })
      })
    } catch {
      errorToast(ALERT_MESSAGE.REQUEST_ERROR)
    }
  }

  // 삭제 후 order 재정렬
  const handleDelete = async (id: string) => {
    try {
      // 삭제할 아이템의 order 값 찾기
      const deleteItem = data.find(item => item.id === id)
      if (!deleteItem) return

      await fetch(`/api/gallery`, {
        method: 'DELETE',
        body: JSON.stringify({ id, order: deleteItem.order }),
      })

      // 클라이언트 상태 업데이트: 삭제된 아이템 제거하고 order 재정렬
      setData(prev => {
        const filteredData = prev.filter(item => item.id !== id)
        return filteredData.map(item => {
          if (item.order > deleteItem.order) {
            return { ...item, order: item.order - 1 }
          }
          return item
        })
      })

      successToast(ALERT_MESSAGE.REQUEST_SUCCESS)
    } catch {
      errorToast(ALERT_MESSAGE.REQUEST_ERROR)
    }
  }

  const handleEdit = (id: string) => {
    router.push(`../templates/gallery/edit/${id}`)
  }

  // 페이지네이션 번호 생성
  const generatePageNumbers = () => {
    const pages = []
    const totalPages = paginationInfo.totalPages
    const currentPageNum = paginationInfo.page

    // 최대 5개의 페이지 번호만 표시
    let startPage = Math.max(1, currentPageNum - 2)
    const endPage = Math.min(totalPages, currentPageNum + 2)

    // 시작 페이지 조정
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <>
      <div className='flex items-center gap-2 justify-end'>
        <div className='flex items-center gap-1'>
          <Eye className='size-4 text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>노출 개수</p>
        </div>
        <Select
          value={currentLimit.toString()}
          onValueChange={value => handleLimitChange(parseInt(value))}
        >
          <SelectTrigger className='w-20'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='50'>50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>번호</TableHead>
              <TableHead className='w-[75px]'>순서 정렬</TableHead>
              <TableHead className='w-[100px]'>상태</TableHead>
              <TableHead className='w-[100px]'>이미지</TableHead>
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

                  {/* 이미지 */}
                  <TableCell>
                    <TableThumbnailImage
                      alt={column.title}
                      thumbnail={column.thumbnail}
                      visibleStatus={column.isVisible}
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
            {data.length === 0 && <TableEmptyData colSpan={7} />}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      {paginationInfo.totalPages > 1 && (
        <Pagination className='mt-4'>
          <PaginationContent>
            {/* 이전 페이지 */}
            <PaginationItem>
              <PaginationPrevious
                className={
                  paginationInfo.page <= 1
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
                href='#'
                onClick={e => {
                  e.preventDefault()
                  if (paginationInfo.page > 1) {
                    handlePageChange(paginationInfo.page - 1)
                  }
                }}
              />
            </PaginationItem>

            {/* 첫 페이지 */}
            {generatePageNumbers()[0] > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={e => {
                      e.preventDefault()
                      handlePageChange(1)
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {generatePageNumbers()[0] > 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {/* 페이지 번호들 */}
            {generatePageNumbers().map(pageNum => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href='#'
                  isActive={pageNum === paginationInfo.page}
                  onClick={e => {
                    e.preventDefault()
                    handlePageChange(pageNum)
                  }}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* 마지막 페이지 */}
            {generatePageNumbers()[generatePageNumbers().length - 1] <
              paginationInfo.totalPages && (
              <>
                {generatePageNumbers()[generatePageNumbers().length - 1] <
                  paginationInfo.totalPages - 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    onClick={e => {
                      e.preventDefault()
                      handlePageChange(paginationInfo.totalPages)
                    }}
                  >
                    k{paginationInfo.totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* 다음 페이지 */}
            <PaginationItem>
              <PaginationNext
                className={
                  paginationInfo.page >= paginationInfo.totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
                href='#'
                onClick={e => {
                  e.preventDefault()
                  if (paginationInfo.page < paginationInfo.totalPages) {
                    handlePageChange(paginationInfo.page + 1)
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}
