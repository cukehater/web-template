import { apiGet } from '@/app/(cms)/_shared/api'
import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'

import LoginForm from './ui/login-form'

export default async function Page() {
  const { data: basicData, error } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  if (error) {
    return null
  }

  return <LoginForm logo={basicData?.logo as string} />
}
