import { ALERT_MESSAGE } from '@cms/shared/lib'

export default async function login(userId: string, password: string) {
  try {
    const res = await fetch('/entities/auth/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ userId, password }),
    })

    if (!res.ok) {
      const error = await res.json()
      return { error }
    }

    const { user } = await res.json()
    return { user }
  } catch {
    return { error: ALERT_MESSAGE.REQUEST_ERROR }
  }
}
