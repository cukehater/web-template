'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/app/(cms)/_shared/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <Button variant='outline' onClick={handleLogout}>
      <LogOut className='mr-2 h-4 w-4' />
      로그아웃
    </Button>
  )
}
