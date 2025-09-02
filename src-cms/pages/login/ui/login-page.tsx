import { apiGet } from '@cms/shared/api'

import LoginForm from './login-form'

interface LogoResponseType {
  logo: string
}

export default async function LoginPage() {
  const { data } = await apiGet<LogoResponseType>('/api/basic?logo')

  return (
    <div className="flex h-screen flex-col w-screen items-center justify-center">
      <LoginForm logo={data?.logo || ''} />
    </div>
  )
}
