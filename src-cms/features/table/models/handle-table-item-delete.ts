import { apiDelete } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast, successToast } from '@cms/shared/lib'

interface DeleteItemParamsType {
  id: string
  onSuccess: () => void
  order: number
}

export async function handleTableItemDelete({ id, order, onSuccess }: DeleteItemParamsType) {
  try {
    await apiDelete('/api/gallery', {
      id,
      order
    })

    onSuccess()
    successToast(ALERT_MESSAGES.REQUEST_SUCCESS)
  } catch {
    errorToast(ALERT_MESSAGES.REQUEST_ERROR)
  }
}
