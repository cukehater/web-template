import { apiPost } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast } from '@cms/shared/lib'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'

export default function SidebarLogoutButton() {
  const handleLogout = async () => {
    try {
      await apiPost('/api/auth/logout', { credentials: 'include' })
    } catch {
      errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    }
  }

  return (
    <Link
      className="w-full flex items-center gap-2 justify-start py-1.5 px-2"
      href="/"
      onClick={handleLogout}
    >
      <LogOutIcon className="size-4" />
      <p className="font-medium text-muted-foreground">로그아웃</p>
    </Link>
  )
}
