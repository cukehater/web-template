import { apiGet } from '@/app/(cms)/_shared/api'
import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'

import BasicContainer from './ui/basic-container'

export default async function Page() {
  const { data: initialData } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  return <BasicContainer initialData={initialData || {}} />
}
