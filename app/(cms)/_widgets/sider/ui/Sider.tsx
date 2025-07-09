import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarRail,
} from '@/app/(cms)/_shared/ui'
import SiderHeader from './SiderHeader'
import SiderMenu from './SiderMenu'

export default function Sider() {
  return (
    <Sidebar collapsible='icon' className='group/sider'>
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
