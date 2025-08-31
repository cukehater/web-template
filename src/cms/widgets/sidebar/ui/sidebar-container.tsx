'use client'

import { SidebarNav } from '@cms/features/change-route'
import { BasicFormSchemaType } from '@cms/shared/schema'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@cms/shared/shadcn'

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
