'use client'

import { Menu, Layout, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { sidebarMenu } from '../constant/sidebarMenu'
import { siderStyle } from '../constant/sidebarStyle'

const items: MenuProps['items'] = sidebarMenu.map(item => ({
  key: item.key,
  label: item.label,
  children: item.children?.map(child => ({
    key: child.key,
    label: child.label,
  })),
}))

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  console.log('pathname', pathname)

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key.startsWith('/')) {
      router.push(key)
    }
  }

  return (
    <Layout.Sider width={200} style={siderStyle}>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
        onClick={handleMenuClick}
      />
    </Layout.Sider>
  )
}
