import { MenuItemType, routeItems } from '@cms/features/change-route'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type BreadcrumbPathType = {
  title: string
  url: string
  parent: string[]
}

export function useBreadcrumbPath() {
  const pathname = usePathname()?.split('/').slice(0, 4).join('/')

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

    recursion(routeItems, [])

    const result = Array.from(set.keys()).filter((item) => item.url === pathname)[0]

    setBreadcrumbPath(result)
  }, [pathname])

  useEffect(() => {
    getBreadcrumbPath()
  }, [pathname, getBreadcrumbPath])

  return { breadcrumbPath }
}
