import { apiGet } from '@cms/shared/api'
import { extractDefaultValues } from '@cms/shared/lib'
import { BasicFormSchemaType, initialBasicFormData } from '@cms/shared/models'

import BasicCards from './basic-cards'

export default async function BasicPage() {
  const { data: basicData } = await apiGet('/api/basic')
  const defaultValues = extractDefaultValues(
    basicData as BasicFormSchemaType,
    initialBasicFormData,
    ['updatedAt', 'createdAt', 'id']
  )

  return <BasicCards defaultValues={defaultValues as BasicFormSchemaType} />
}
