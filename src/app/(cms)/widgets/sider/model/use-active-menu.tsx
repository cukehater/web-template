import { usePathname } from 'next/navigation'

import { MenuItemType } from '@/app/(cms)/entities/admin-menu'

export default function useActiveMenu() {
  const pathname = usePathname()

  // 현재 경로가 특정 메뉴 아이템에 속하는지 확인하는 함수
  function isMenuActive(menuItem: MenuItemType): boolean {
    // 현재 메뉴 아이템의 URL과 일치하는지 확인
    if (menuItem.url && pathname === menuItem.url) {
      return true
    }

    // 하위 메뉴 아이템들 중 현재 경로와 일치하는 것이 있는지 확인
    if (menuItem.items) {
      return menuItem.items.some(
        (subItem: MenuItemType) => subItem.url && pathname === subItem.url,
      )
    }

    return false
  }

  return {
    pathname,
    isMenuActive,
  }
}
