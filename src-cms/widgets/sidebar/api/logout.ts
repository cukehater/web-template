import { apiPost } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast } from '@cms/shared/lib'

export async function logout() {
  try {
    await apiPost('/api/auth/logout', { credentials: 'include' })
  } catch {
    errorToast(ALERT_MESSAGES.REQUEST_ERROR)
  }
}
