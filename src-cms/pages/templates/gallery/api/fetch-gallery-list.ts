import { apiGet } from '@cms/shared/api'

import { GalleryResponseType } from '../models/types'

export async function fetchGalleryList(page: number, limit: number): Promise<GalleryResponseType> {
  const { data } = await apiGet<GalleryResponseType>(`/api/gallery?page=${page}&limit=${limit}`)
  return data as GalleryResponseType
}
