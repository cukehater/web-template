import { PaginationType } from '../models/types'

export const generatePageNumbers = (paginationInfo: PaginationType) => {
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
