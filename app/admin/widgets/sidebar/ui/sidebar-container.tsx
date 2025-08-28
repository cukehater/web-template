'use client'

import { SidebarNav } from '@/app/admin/features/change-route'
import { BasicFormSchemaType } from '@/app/admin/shared/schema'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@/app/admin/shared/shadcn'

import SidebarAccount from './sidebar-account'

export default function SidebarContainer({
  basicData,
  children,
}: {
  basicData: BasicFormSchemaType
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar className='group/sidebar' collapsible='icon'>
        <SidebarAccount basicData={basicData} />
        <SidebarContent>
          <SidebarGroup>
            <SidebarNav />
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
