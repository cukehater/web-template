import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { ADMIN_MENU_ITEMS, MenuItemType } from '@/app/(cms)/_shared/model'

import { BreadcrumbPathType } from './types'

export function useBreadcrumbPath() {
  const pathname = usePathname()
  const [breadcrumbPath, setBreadcrumbPath] = useState<BreadcrumbPathType>()

  const getBreadcrumbPath = useCallback(() => {
    const set = new Set<BreadcrumbPathType>()

    function recursion(list: MenuItemType[], parent: string[]) {
      for (const { title, url, items } of list) {
        if (url) {
          set.add({ title, url, parent })
        }
        if (items) {
          recursion(items, [...parent, title])
        }
      }
    }

    recursion(ADMIN_MENU_ITEMS, [])

    const result = Array.from(set.keys()).filter(
      item => item.url === pathname,
    )[0]

    setBreadcrumbPath(result)
  }, [pathname])

  useEffect(() => {
    getBreadcrumbPath()
  }, [pathname, getBreadcrumbPath])

  return { breadcrumbPath }
}
