import { apiGet } from '@cms/shared/api'
import { extractDefaultValues } from '@cms/shared/lib'
import { Basic } from '@prisma/client'

import { BasicFormSchemaType, initialBasicFormData } from '../models/schema'
import BasicForm from './basic-form'

export default async function BasicPage() {
  const { data: basicData } = await apiGet<Basic>('/api/basic')

  const defaultValues = extractDefaultValues(basicData as Basic, initialBasicFormData, [
    'updatedAt',
    'createdAt',
    'id'
  ])

  return <BasicForm defaultValues={defaultValues as BasicFormSchemaType} />
}
