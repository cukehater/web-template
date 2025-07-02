'use client'

import { Menu, Layout, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { CSSProperties } from 'react'

const menuItems = [
  {
    key: '/admin',
    label: '기본 설정',
  },
  {
    key: '/admin/members',
    label: '회원 관리',
  },
  {
    key: '/admin/boards',
    label: '게시판 관리',
    children: [
      {
        key: '/admin/boards/1',
        label: '게시판 1',
      },
      {
        key: '/admin/boards/2',
        label: '게시판 2',
      },
      {
        key: '/admin/boards/3',
        label: '게시판 3',
      },
    ],
  },
  {
    key: '/admin/communities',
    label: '커뮤니티 관리',
  },
]

const items: MenuProps['items'] = menuItems.map(item => ({
  key: item.key,
  label: item.label,
  children: item.children?.map(child => ({
    key: child.key,
    label: child.label,
  })),
}))

const siderStyle: CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
}

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
