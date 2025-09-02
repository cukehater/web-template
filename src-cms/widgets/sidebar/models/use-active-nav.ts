import { usePathname } from 'next/navigation'

import { NavItemsType } from './nav-items'

export default function useActiveNav() {
  const pathname = usePathname()

  function isMenuActive(menuItem: NavItemsType): boolean {
    if (menuItem.url && pathname === menuItem.url) {
      return true
    }

    if (menuItem.items) {
      return menuItem.items.some((subItem: NavItemsType) => subItem.url && pathname === subItem.url)
    }

    return false
  }

  return {
    pathname,
    isMenuActive
  }
}
