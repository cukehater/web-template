import { redirect } from 'next/navigation'

import { ALERT_MESSAGE } from '@/app/(cms)/shared/lib'

export default async function logout() {
  try {
    await fetch('/entities/auth/api/logout', {
      method: 'POST',
      credentials: 'include',
    })

    redirect('/admin/login')
  } catch {
    return { error: ALERT_MESSAGE.REQUEST_ERROR }
  }
}
