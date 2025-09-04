import { apiPut } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast, infoToast } from '@cms/shared/lib'

interface OrderChangeParamsType {
  table: string
  id: string
  currentOrder: number
  direction: 'up' | 'down'
  totalCount: number
  onSuccess?: () => void
}

export async function handleTableOrderChange<T>({
  table,
  id,
  currentOrder,
  direction,
  totalCount,
  onSuccess = () => {}
}: OrderChangeParamsType) {
  const isFirstItem = currentOrder === totalCount
  const isLastItem = currentOrder === 1

  const newOrder = direction === 'up' ? currentOrder + 1 : currentOrder - 1

  if ((direction === 'up' && isFirstItem) || (direction === 'down' && isLastItem)) {
    const message =
      direction === 'up' ? ALERT_MESSAGES.ORDER_CHANGE_FIRST : ALERT_MESSAGES.ORDER_CHANGE_LAST
    infoToast(message)
    return false
  }

  try {
    const { data: siblingData } = await apiPut<T>(`/api/post?table=${table}&type=order`, {
      id,
      currentOrder,
      newOrder,
      direction
    })

    if (!siblingData) return false

    onSuccess()
    return true
  } catch {
    errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    return false
  }
}
