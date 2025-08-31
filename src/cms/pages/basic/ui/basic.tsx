import { apiClient, extractDefaultValues } from '@/cms/shared/lib'
import { BasicFormSchemaType, initialBasicFormData } from '@/cms/shared/schema'

import BasicContainer from './basic-container'

export default async function Page() {
  const { data: basicData } = await apiClient(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  const defaultValues = extractDefaultValues(
    basicData as BasicFormSchemaType,
    initialBasicFormData,
    ['updatedAt', 'createdAt', 'id'],
  )

  return <BasicContainer defaultValues={defaultValues as BasicFormSchemaType} />
}
