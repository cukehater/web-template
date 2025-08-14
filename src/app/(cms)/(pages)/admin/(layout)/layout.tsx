'use client'

import { SidebarInset, SidebarProvider } from '@//app/(cms)/_shared/shadcn'
import { Breadcrumb } from '@//app/(cms)/_widgets/breadcrumb'
import { Sider } from '@//app/(cms)/_widgets/sider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sider />
      <SidebarInset>
        <Breadcrumb />
        <main className='flex flex-1 flex-col gap-4 p-4 min-h-screen'>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
