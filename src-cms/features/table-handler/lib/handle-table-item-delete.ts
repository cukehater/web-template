import { apiDelete } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast, successToast } from '@cms/shared/lib'

interface DeleteItemParamsType {
  table: string
  id: string
  onSuccess?: () => void
  order: number
}

export async function handleTableItemDelete({
  table,
  id,
  order,
  onSuccess = () => {}
}: DeleteItemParamsType) {
  try {
    await apiDelete(`/api/post?table=${table}`, {
      id,
      order
    })

    onSuccess()
    successToast(ALERT_MESSAGES.POST_DELETE_SUCCESS)
  } catch {
    errorToast(ALERT_MESSAGES.REQUEST_ERROR)
  }
}
