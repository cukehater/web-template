import { apiGet } from '@cms/shared/api'
import { SidebarContainer } from '@cms/widgets/sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { data } = await apiGet<{ favicon: string; companyName: string }>(
    '/api/basic?favicon&companyName'
  )

  return (
    <SidebarContainer companyName={data?.companyName || ''} favicon={data?.favicon || ''}>
      <main className="flex flex-1 flex-col gap-4 p-8 min-h-screen">{children}</main>
    </SidebarContainer>
  )
}
