'use client'

import { GlobalNavBar } from '@cms/features/change-nav'
import { BasicFormSchemaType } from '@cms/shared/models'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarProvider,
  SidebarRail
} from '@cms/shared/shadcn'

import Breadcrumb from './breadcrumb'
import SidebarAccount from './sidebar-account'

export default function SidebarContainer({
  basicData,
  children
}: {
  basicData: BasicFormSchemaType
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar className="group/sidebar" collapsible="icon">
        <SidebarAccount basicData={basicData} />
        <SidebarContent>
          <SidebarGroup>
            <GlobalNavBar />
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
