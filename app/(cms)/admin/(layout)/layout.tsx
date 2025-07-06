import { Breadcrumb, Sider } from '../../_widgets'
import { SidebarInset, SidebarProvider } from '../../_shared'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Sider />
        <SidebarInset>
          <Breadcrumb />
          <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
