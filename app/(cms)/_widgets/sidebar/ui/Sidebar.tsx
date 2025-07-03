'use client'

import { ADMIN_MENU_ITEMS } from '@/app/(cms)/_entities'
import { useMenuPrefetch } from '@/app/(cms)/_features'
import { Menu, Layout, MenuProps } from 'antd'
import ColumnGroup from 'antd/es/table/ColumnGroup'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const items = ADMIN_MENU_ITEMS.map(item => ({
  key: item.key,
  label: item.label,
  icon: item.icon,
  children: item.children?.map(child => ({
    key: child.key,
    label: child.label,
  })),
}))

export default function Sidebar() {
  const router = useRouter()
  const { prefetchAllMenu } = useMenuPrefetch()

  const handleMenuClick: any = ({ keyPath }: { keyPath: string[] }) => {
    router.push(`/admin/${keyPath.reverse().join('/')}`)
  }

  useEffect(() => {
    prefetchAllMenu()
  }, [])

  return (
    <Layout.Sider
      width={200}
      className='h-screen overflow-auto sticky inset-y-0 border-r border-gray-100 bg-white'
    >
      <Menu mode='inline' items={items} onClick={handleMenuClick} />
    </Layout.Sider>
  )
}
