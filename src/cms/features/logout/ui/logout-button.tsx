import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'

import logout from '../api/logout'

export default function LogoutButton() {
  return (
    <Link
      className='w-full flex items-center gap-2 justify-start'
      href='/'
      onClick={logout}
    >
      <LogOutIcon className='size-4' />{' '}
      <p className='text-muted-foreground font-medium'>로그아웃</p>
    </Link>
  )
}
