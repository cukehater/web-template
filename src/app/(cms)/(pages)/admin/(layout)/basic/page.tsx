import { apiGet } from '@/app/(cms)/_shared/api'
import { setDefaultValues } from '@/app/(cms)/_shared/lib'
import {
  BasicFormSchemaType,
  initialBasicFormData,
} from '@/app/(cms)/_shared/schema'

import BasicContainer from './ui/basic-container'

export default async function Page() {
  const { data } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  const defaultValues = setDefaultValues(data, initialBasicFormData, [
    'updatedAt',
    'createdAt',
    'id',
  ])

  return <BasicContainer defaultValues={defaultValues as BasicFormSchemaType} />
}
