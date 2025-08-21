import { apiGet } from '@/app/(cms)/_shared/api'
import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'

import BasicContainer from './ui/basic-container'

export default async function Page() {
  const { data: initialData, error } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  // TODO: 에러 페이지 추가
  if (error) return <div>{error}</div>

  return <BasicContainer initialData={initialData} />
}
