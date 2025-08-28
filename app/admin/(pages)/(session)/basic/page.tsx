import { BasicFormSchemaType, initialBasicFormData } from '@cms/shared/schema'

import { apiClient, extractDefaultValues } from '@/app/admin/shared/lib'

import BasicContainer from './ui/basic-container'

export default async function Page() {
  const { data } = await apiClient<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/entities/basic/api`,
  )

  const defaultValues = extractDefaultValues(data, initialBasicFormData, [
    'updatedAt',
    'createdAt',
    'id',
  ])

  return <BasicContainer defaultValues={defaultValues as BasicFormSchemaType} />
}
