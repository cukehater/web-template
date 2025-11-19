import { apiGet } from '@cms/shared/api'
import { Gallery } from '@prisma/client'

import GalleryCreatePage from '../../create/gallery-create-page'

interface GalleryEditPagePropsType {
  params: {
    id: string
  }
}

export default async function GalleryEditPage({ params }: GalleryEditPagePropsType) {
  const routerParams = await params
  const slug = routerParams.id[0]

  const { data } = await apiGet(`/api/post/detail?table=gallery&slug=${slug}`)

  return <GalleryCreatePage editData={data as Gallery} />
}
