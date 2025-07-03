import { ADMIN_MENU_ITEMS } from '@/app/(cms)/_entities'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useMenuPrefetch = () => {
  const router = useRouter()

  const prefetchAllMenu = useCallback(() => {
    for (const item of ADMIN_MENU_ITEMS) {
      if (!item.children) {
        router.prefetch(item.key)
        continue
      }

      for (const child of item.children) {
        router.prefetch(child.key)
      }
    }
  }, [router])

  return { prefetchAllMenu }
}
