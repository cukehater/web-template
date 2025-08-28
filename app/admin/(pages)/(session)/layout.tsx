import { apiClient } from '@cms/shared/lib'
import { BasicFormSchemaType } from '@cms/shared/schema'
import { BreadcrumbContainer } from '@cms/widgets/breadcrumb'
import { SiderContainer } from '@cms/widgets/sidebar'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: basicData } = await apiClient<BasicFormSchemaType>(
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
