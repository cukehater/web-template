import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarRail,
} from '@//app/(cms)/_shared/shadcn'

import SiderHeader from './SiderHeader'
import SiderMenu from './SiderMenu'

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
