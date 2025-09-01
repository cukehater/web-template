import { apiGet } from '@cms/shared/api'
import { BasicFormSchemaType } from '@cms/shared/models'

import LoginForm from './login-form'

export default async function LoginPage() {
  const { data: basicData } = await apiGet<BasicFormSchemaType>('/api/basic')

  const logo = basicData?.logo || ''

  return (
    <div className="flex h-screen flex-col w-screen items-center justify-center">
      <LoginForm logo={logo as string} />
    </div>
  )
}
