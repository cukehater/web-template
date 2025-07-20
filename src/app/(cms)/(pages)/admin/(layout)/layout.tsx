'use client'

import { SessionProvider, signOut } from 'next-auth/react'
import { SidebarInset, SidebarProvider } from '@//app/(cms)/_shared/ui'
import { Breadcrumb } from '@//app/(cms)/_widgets/breadcrumb'
import { Sider } from '@//app/(cms)/_widgets/sider'
import { LogOutIcon } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <Sider />
        <SidebarInset>
          <div className='flex items-center justify-between p-4 border-b'>
            <Breadcrumb />
            <button
              className='flex items-center gap-2'
              onClick={() => signOut()}
            >
              <span>Logout</span>
              <LogOutIcon className='w-4 h-4' />
            </button>
          </div>
          <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  )
}
