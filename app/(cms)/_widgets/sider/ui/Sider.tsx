import { Sidebar, SidebarRail } from '@/app/(cms)/_shared'
import { SiderContent, SiderHeader } from '@/app/(cms)/_widgets/sider/ui'

export default function Sider() {
  return (
    <Sidebar collapsible='icon' className='group/sider'>
      <SiderHeader />
      <SiderContent />
      <SidebarRail />
    </Sidebar>
  )
}
