'use client'

import { Pagination, PaginationType } from '@cms/features/pagination'
import { RowAmountSelector } from '@cms/features/row-amount-selector'
import { handleTableItemDelete } from '@cms/features/table'
import { apiPut } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast, infoToast } from '@cms/shared/lib'
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
  TableStatusIndicator,
  TableThumbnailImage
} from '@cms/shared/ui'
import { Gallery } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { fetchGalleryList } from '../../api/fetch-gallery-list'

interface GalleryTablePropsType {
  initialData: Gallery[]
  pagination: PaginationType
  currentPage: number
  currentLimit: 10 | 20 | 50
}

export default function GalleryTable({
  initialData,
  pagination,
  currentPage,
  currentLimit
}: GalleryTablePropsType) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [paginationInfo, setPaginationInfo] = useState(pagination)
  const [isSorting, setIsSorting] = useState(false)

  // 페이지 변경 시 데이터 새로고침
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, pagination } = await fetchGalleryList(currentPage, currentLimit)

        setData(data)
        setPaginationInfo(pagination)
      } catch {
        errorToast(ALERT_MESSAGES.REQUEST_ERROR)
      }
    }

    fetchData()
  }, [currentPage, currentLimit])

  // 순서 변경
  const handleOrderChange = async (id: string, currentOrder: number, direction: 'up' | 'down') => {
    if (isSorting) return

    const isFirstItem = currentOrder === paginationInfo.total
    const isLastItem = currentOrder === 1
    const newOrder = direction === 'up' ? currentOrder + 1 : currentOrder - 1

    if ((direction === 'up' && isFirstItem) || (direction === 'down' && isLastItem)) {
      const message =
        direction === 'up' ? ALERT_MESSAGES.ORDER_CHANGE_FIRST : ALERT_MESSAGES.ORDER_CHANGE_LAST
      infoToast(message)
      return
    }

    try {
      setIsSorting(true)

      const { data: siblingData } = await apiPut<Gallery>('/api/gallery?type=order', {
        id,
        currentOrder,
        newOrder,
        direction
      })

      if (!siblingData) return

      setData((prev) => {
        const targetIdx = prev.findIndex((item) => item.id === id)
        const siblingIdx = prev.findIndex((item) => item.id === siblingData.id)

        // 새로운 배열을 생성하여 불변성 유지
        const newData = [...prev]
        newData[targetIdx] = { ...siblingData, order: currentOrder }
        newData[siblingIdx] = { ...prev[targetIdx], order: newOrder }

        return newData
      })
    } catch {
      errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    } finally {
      setIsSorting(false)
    }
  }

  // 활성 상태 변경
  const handleToggleVisible = async (id: string, isVisible: boolean) => {
    try {
      await apiPut<Gallery>('/api/gallery?type=visible', {
        id,
        isVisible: !isVisible
      })

      setData((prev) => {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, isVisible: !item.isVisible }
          }
          return item
        })
      })
    } catch {
      errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    }
  }

  // const handleDelete = async (id: string) => {
  //   try {
  //     // 삭제할 아이템의 order 값 찾기
  //     const targetItem = data.find((item) => item.id === id)
  //     if (!targetItem) return

  //     await apiDelete<Gallery>('/api/gallery', {
  //       id,
  //       order: targetItem.order
  //     })

  //     // 클라이언트 상태 업데이트: 삭제된 아이템 제거하고 order 재정렬
  //     setData((prev) => {
  //       const filteredData = prev.filter((item) => item.id !== id)
  //       return filteredData.map((item) => {
  //         if (item.order > targetItem.order) {
  //           return { ...item, order: item.order - 1 }
  //         }
  //         return item
  //       })
  //     })

  //     successToast(ALERT_MESSAGES.REQUEST_SUCCESS)
  //   } catch {
  //     errorToast(ALERT_MESSAGES.REQUEST_ERROR)
  //   }
  // }

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
              <TableHead className="w-[100px]">이미지</TableHead>
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
                      onOrderChangeDown={() => handleOrderChange(column.id, column.order, 'down')}
                      onOrderChangeUp={() => handleOrderChange(column.id, column.order, 'up')}
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
                      onDelete={async () =>
                        await handleTableItemDelete({
                          id: column.id,
                          order: column.order,
                          onSuccess: () => {
                            setData((prev) => {
                              const filteredData = prev.filter((item) => item.id !== column.id)
                              return filteredData.map((item) => {
                                if (item.order > column.order) {
                                  return { ...item, order: item.order - 1 }
                                }
                                return item
                              })
                            })
                          }
                        })
                      }
                      onEdit={() => router.push(`../templates/gallery/edit/${column.id}`)}
                      onToggleVisible={() => handleToggleVisible(column.id, column.isVisible)}
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
