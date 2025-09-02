import { PaginationType } from '@cms/shared/models'
import { Gallery } from '@prisma/client'

export interface GalleryResponseType {
  data: Gallery[]
  pagination: PaginationType
}
