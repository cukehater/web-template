import { Breadcrumb } from '@//app/(cms)/_widgets/breadcrumb'
import { apiGet } from '@/app/(cms)/_shared/api'
import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'
import SiderContainer from '@/app/(cms)/_widgets/sider/ui/sider-container'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: basicData } = await apiGet<BasicFormSchemaType>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`,
  )

  return (
    <SiderContainer basicData={basicData}>
      <Breadcrumb />
      <main className='flex flex-1 flex-col gap-4 p-8 min-h-screen'>
        {children}
      </main>
    </SiderContainer>
  )
}
