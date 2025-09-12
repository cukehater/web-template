'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarProvider,
  SidebarRail
} from '@cms/shared/ui/shadcn'

import Breadcrumb from './breadcrumb'
import SidebarAccount from './sidebar-account'
import SidebarNav from './sidebar-nav'

export default function SidebarContainer({
  companyName,
  favicon,
  children
}: {
  companyName: string
  favicon: string
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar className="group/sidebar" collapsible="icon">
        <SidebarAccount companyName={companyName} favicon={favicon} />
        <SidebarContent>
          <SidebarGroup>
            <SidebarNav />
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <Breadcrumb />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
