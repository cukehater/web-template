import { SessionProvider } from 'next-auth/react'
import { SidebarInset, SidebarProvider } from '@/app/(cms)/_shared/ui'
import { Breadcrumb } from '@/app/(cms)/_widgets/breadcrumb'
import { Sider } from '@/app/(cms)/_widgets/sider'
import { LogoutButton } from '@/components/LogoutButton'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <Sider />
        <SidebarInset>
          <div className='flex items-center justify-between p-4 border-b'>
            <Breadcrumb />
            <LogoutButton />
          </div>
          <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  )
}
