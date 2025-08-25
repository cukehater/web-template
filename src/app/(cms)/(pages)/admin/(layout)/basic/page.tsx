import { apiGet } from '@/app/(cms)/_shared/api'
import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'

import BasicContainer from './ui/basic-container'

const EXCLUDED_FIELDS = ['updatedAt', 'createdAt', 'id'] as const

export default async function Page() {
  const { data } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  const initialValues = Object.fromEntries(
    Object.entries(data || {}).filter(
      ([key]) =>
        !EXCLUDED_FIELDS.includes(key as (typeof EXCLUDED_FIELDS)[number]),
    ),
  )

  return <BasicContainer initialValues={initialValues as BasicFormSchemaType} />
}
