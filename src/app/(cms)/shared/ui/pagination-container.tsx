'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { PaginationInfo } from '../model'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../shadcn'

export default function PaginationContainer({
  paginationInfo,
}: {
  paginationInfo: PaginationInfo
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const generatePageNumbers = () => {
    const pages = []
    const totalPages = paginationInfo.totalPages
    const currentPageNum = paginationInfo.page

    let startPage = Math.max(1, currentPageNum - 2)
    const endPage = Math.min(totalPages, currentPageNum + 2)

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <Pagination className='mt-4'>
      <PaginationContent>
        {/* 이전 페이지 */}
        <PaginationItem>
          <PaginationPrevious
            className={
              paginationInfo.page <= 1 ? 'pointer-events-none opacity-50' : ''
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
                {paginationInfo.totalPages}
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
  )
}
