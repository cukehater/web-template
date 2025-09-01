import { apiGet } from '@cms/shared/api'
import { extractDefaultValues } from '@cms/shared/lib'
import { BasicFormSchemaType, initialBasicFormData } from '@cms/shared/models'

import CardContainer from './components/card-container'

export default async function BasicPage() {
  const { data: basicData } = await apiGet('/api/basic')
  const defaultValues = extractDefaultValues(
    basicData as BasicFormSchemaType,
    initialBasicFormData,
    ['updatedAt', 'createdAt', 'id']
  )

  return <CardContainer defaultValues={defaultValues as BasicFormSchemaType} />
}
