import { apiGet } from '@cms/shared/api'
import { BasicFormSchemaType } from '@cms/shared/models'
import { BreadcrumbContainer } from '@cms/widgets/breadcrumb'
import { SidebarContainer } from '@cms/widgets/sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { data } = await apiGet('/api/basic')

  return (
    <SidebarContainer basicData={data as BasicFormSchemaType}>
      <BreadcrumbContainer />
      <main className="flex flex-1 flex-col gap-4 p-8 min-h-screen">{children}</main>
    </SidebarContainer>
  )
}
