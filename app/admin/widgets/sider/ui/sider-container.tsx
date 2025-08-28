'use client'

import { BasicFormSchemaType } from '@cms/shared/schema'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@cms/shared/shadcn'

import SiderHeader from './sider-header'
import SiderMenu from './sider-menu'

export default function SiderContainer({
  basicData,
  children,
}: {
  basicData: BasicFormSchemaType
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar className='group/sider' collapsible='icon'>
        <SiderHeader basicData={basicData} />
        <SidebarContent>
          <SidebarGroup>
            <SiderMenu />
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
