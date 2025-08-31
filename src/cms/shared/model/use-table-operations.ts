'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ALERT_MESSAGE, errorToast, infoToast, successToast } from '../lib'
import { PaginationInfo } from '../model'

interface TableItem {
  id: string
  order: number
  isVisible: boolean
  title: string
  createdAt: Date
}

interface UseTableOperationsProps<T extends TableItem> {
  initialData: T[]
  pagination: PaginationInfo
  currentPage: number
  currentLimit: number
  apiEndpoint: string
  editPath: string
}

export function useTableOperations<T extends TableItem>({
  initialData,
  pagination,
  currentPage,
  currentLimit,
  apiEndpoint,
  editPath,
}: UseTableOperationsProps<T>) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [paginationInfo, setPaginationInfo] = useState(pagination)
  const [isSorting, setIsSorting] = useState(false)

  // 순서 변경
  const handleOrderChange = useCallback(
    async (id: string, currentOrder: number, direction: 'up' | 'down') => {
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
        const response = await fetch(`${apiEndpoint}?type=order`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            currentOrder,
            newOrder,
            direction,
          }),
        })

        if (!response.ok) {
          throw new Error('순서 변경에 실패했습니다')
        }

        const { data: siblingData } = await response.json()

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
    },
    [isSorting, paginationInfo.total, apiEndpoint],
  )

  // 활성 상태 변경
  const handleToggleVisible = useCallback(
    async (id: string, isVisible: boolean) => {
      try {
        const response = await fetch(`${apiEndpoint}?type=visible`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            isVisible: !isVisible,
          }),
        })

        if (!response.ok) {
          throw new Error('상태 변경에 실패했습니다')
        }

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
    },
    [apiEndpoint],
  )

  // 삭제 후 order 재정렬
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        // 삭제할 아이템의 order 값 찾기
        const deleteItem = data.find(item => item.id === id)
        if (!deleteItem) return

        const response = await fetch(apiEndpoint, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, order: deleteItem.order }),
        })

        if (!response.ok) {
          throw new Error('삭제에 실패했습니다')
        }

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

        // 페이지네이션 정보 업데이트
        setPaginationInfo(prev => ({
          ...prev,
          total: prev.total - 1,
        }))

        successToast(ALERT_MESSAGE.REQUEST_SUCCESS)
      } catch {
        errorToast(ALERT_MESSAGE.REQUEST_ERROR)
      }
    },
    [data, apiEndpoint],
  )

  // 편집 페이지로 이동
  const handleEdit = useCallback(
    (id: string) => {
      router.push(`${editPath}/${id}`)
    },
    [router, editPath],
  )

  // 데이터 새로고침
  const refreshData = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiEndpoint}?page=${currentPage}&limit=${currentLimit}`,
      )
      if (!response.ok) {
        throw new Error('데이터 조회에 실패했습니다')
      }
      const result = await response.json()
      setData(result.data)
      setPaginationInfo(result.pagination)
    } catch {
      errorToast(ALERT_MESSAGE.REQUEST_ERROR)
    }
  }, [apiEndpoint, currentPage, currentLimit])

  return {
    data,
    paginationInfo,
    isSorting,
    handleOrderChange,
    handleToggleVisible,
    handleDelete,
    handleEdit,
    refreshData,
  }
}
