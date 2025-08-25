import { Gallery } from '@prisma/client'

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface GalleryTableProps {
  initialData: Gallery[]
  pagination: PaginationInfo
  currentPage: number
  currentLimit: number
}
