'use client'

import { ADMIN_MENU_ITEMS } from '@/app/(cms)/_entities'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { usePathname } from 'next/navigation'

export default function Breadcrumb() {
  const pathname = usePathname()

  const flattenMenuItems = (
    items: typeof ADMIN_MENU_ITEMS,
  ): Record<string, string> => {
    const flattened: Record<string, string> = {}

    items.forEach(item => {
      flattened[item.key] = item.label
      if (item.children) {
        item.children.forEach(child => {
          flattened[child.key] = child.label
        })
      }
    })

    return flattened
  }

  const menuMap = flattenMenuItems(ADMIN_MENU_ITEMS)

  const items: BreadcrumbItemType[] = pathname
    .split('/')
    .slice(2)
    .map(segment => ({ title: menuMap[segment] || segment }))
    .filter(item => item.title)

  return <AntdBreadcrumb className='mb-4' items={items} />
}
