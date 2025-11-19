import { apiGet } from '@cms/shared/api'
import { General } from '@prisma/client'

import GeneralCreatePage from '../../create/general-create-page'

interface GeneralEditPagePropsType {
  params: {
    id: string
  }
}

export default async function GeneralEditPage({ params }: GeneralEditPagePropsType) {
  const routerParams = await params
  const slug = routerParams.id[0]

  const { data } = await apiGet(`/api/post/detail?table=general&slug=${slug}`)

  return <GeneralCreatePage editData={data as General} />
}
