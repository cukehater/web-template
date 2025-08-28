import { LoginForm } from '@cms/features/auth'
import { apiClient } from '@cms/shared/api'
import { BasicFormSchemaType } from '@cms/shared/schema'

export default async function Page() {
  const { data: basicData } = await apiClient<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/entities/basic/api`,
  )

  const logo = basicData?.logo || ''

  return (
    <div className='flex h-screen flex-col w-screen items-center justify-center'>
      <LoginForm logo={logo as string} />
    </div>
  )
}
