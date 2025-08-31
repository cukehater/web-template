import { apiClient, extractDefaultValues } from '@/cms/shared/lib'
import { BasicFormSchemaType, initialBasicFormData } from '@/cms/shared/schema'

import CardContainer from './components/card-container'

export default async function Page() {
  const { data: basicData } = await apiClient(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  const defaultValues = extractDefaultValues(
    basicData as BasicFormSchemaType,
    initialBasicFormData,
    ['updatedAt', 'createdAt', 'id'],
  )

  return <CardContainer defaultValues={defaultValues as BasicFormSchemaType} />
}
