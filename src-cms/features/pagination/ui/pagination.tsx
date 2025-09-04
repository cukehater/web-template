'use client'

import { PaginationType } from '@cms/shared/models'
import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@cms/shared/shadcn'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import { generatePageNumbers } from '../lib/generate-page-numbers'

export default function Pagination({ paginationInfo }: { paginationInfo: PaginationType }) {
  const router = useRouter()
  const searchParams = useSearchParams() as URLSearchParams
  const pageNumbers = useMemo(() => generatePageNumbers(paginationInfo), [paginationInfo])

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', page.toString())
      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  if (paginationInfo.totalPages <= 1) return null

  return (
    <PaginationContainer className="mt-4">
      <PaginationContent>
        {/* 이전 페이지 */}
        <PaginationItem>
          <PaginationPrevious
            className={paginationInfo.page <= 1 ? 'pointer-events-none opacity-50' : ''}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (paginationInfo.page > 1) {
                handlePageChange(paginationInfo.page - 1)
              }
            }}
          />
        </PaginationItem>

        {/* 첫 페이지 */}
        {pageNumbers[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(1)
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {pageNumbers[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* 페이지 번호들 */}
        {pageNumbers.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href="#"
              isActive={pageNum === paginationInfo.page}
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(pageNum)
              }}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 마지막 페이지 */}
        {pageNumbers[pageNumbers.length - 1] < paginationInfo.totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < paginationInfo.totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
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
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (paginationInfo.page < paginationInfo.totalPages) {
                handlePageChange(paginationInfo.page + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  )
}
