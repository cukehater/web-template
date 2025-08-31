import { apiClient } from '@cms/shared/lib'
import { BasicFormSchemaType } from '@cms/shared/schema'

import { LoginForm } from '@/cms/features/login'

export default async function Login() {
  const { data: basicData } = await apiClient<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  const logo = basicData?.logo || ''

  return (
    <div className='flex h-screen flex-col w-screen items-center justify-center'>
      <LoginForm logo={logo as string} />
    </div>
  )
}
