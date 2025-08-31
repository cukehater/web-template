import { ALERT_MESSAGE } from '@cms/shared/lib'
import { redirect } from 'next/navigation'

export default async function logout() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    redirect('/admin/login')
  } catch {
    return { error: ALERT_MESSAGE.REQUEST_ERROR }
  }
}
