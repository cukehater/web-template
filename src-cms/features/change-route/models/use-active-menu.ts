import { usePathname } from 'next/navigation'

import { MenuItemType } from './route-items'

export default function useActiveMenu() {
  const pathname = usePathname()

  function isMenuActive(menuItem: MenuItemType): boolean {
    if (menuItem.url && pathname === menuItem.url) {
      return true
    }

    if (menuItem.items) {
      return menuItem.items.some((subItem: MenuItemType) => subItem.url && pathname === subItem.url)
    }

    return false
  }

  return {
    pathname,
    isMenuActive
  }
}
