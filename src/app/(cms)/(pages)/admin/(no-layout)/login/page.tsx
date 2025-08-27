import { LoginForm } from '@/app/(cms)/features/auth'
import { apiGet } from '@/app/(cms)/shared/api'
import { BasicFormSchemaType } from '@/app/(cms)/shared/schema'

export default async function Page() {
  const { data: basicData } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/entities/basic/api`,
  )

  const logo = basicData?.logo || ''

  return (
    <div className='flex h-screen flex-col w-screen items-center justify-center'>
      <LoginForm logo={logo as string} />
    </div>
  )
}
