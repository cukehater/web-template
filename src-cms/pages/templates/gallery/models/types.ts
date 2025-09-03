import { PaginationType } from '@cms/features/pagination'
import { Gallery } from '@prisma/client'

export interface GalleryResponseType {
  data: Gallery[]
  pagination: PaginationType
}
