import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarRail,
} from '@//app/(cms)/_shared/shadcn'

import SiderHeader from './sider-header'
import SiderMenu from './sider-menu'

export default function Sider() {
  return (
    <Sidebar className='group/sider' collapsible='icon'>
      <SiderHeader />
      <SidebarContent>
        <SidebarGroup>
          <SiderMenu />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
