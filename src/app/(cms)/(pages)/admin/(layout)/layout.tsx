import { apiGet } from '@/app/(cms)/shared/api'
import { BasicFormSchemaType } from '@/app/(cms)/shared/schema'
import { BreadcrumbContainer } from '@/app/(cms)/widgets/breadcrumb'
import SiderContainer from '@/app/(cms)/widgets/sider/ui/sider-container'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: basicData } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/entities/basic/api`,
  )

  return (
    <SiderContainer basicData={basicData}>
      <BreadcrumbContainer />
      <main className='flex flex-1 flex-col gap-4 p-8 min-h-screen'>
        {children}
      </main>
    </SiderContainer>
  )
}
