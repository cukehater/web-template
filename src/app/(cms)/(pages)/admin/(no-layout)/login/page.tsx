import { apiGet } from '@/app/(cms)/_shared/api'
import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'

import LoginForm from './ui/login-form'

export default async function Page() {
  const { data: basicData } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  return <LoginForm logo={basicData?.logo as string} />
}
