import { apiPut } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast, infoToast } from '@cms/shared/lib'

interface OrderChangeParamsType<T> {
  id: string
  currentOrder: number
  direction: 'up' | 'down'
  totalItems: number
  apiEndpoint: string
  onSuccess: (siblingData: T) => void
}

export async function handleTableOrderChange<T>({
  id,
  currentOrder,
  direction,
  totalItems,
  apiEndpoint,
  onSuccess
}: OrderChangeParamsType<T>) {
  const isFirstItem = currentOrder === totalItems
  const isLastItem = currentOrder === 1
  const newOrder = direction === 'up' ? currentOrder + 1 : currentOrder - 1

  if ((direction === 'up' && isFirstItem) || (direction === 'down' && isLastItem)) {
    const message =
      direction === 'up' ? ALERT_MESSAGES.ORDER_CHANGE_FIRST : ALERT_MESSAGES.ORDER_CHANGE_LAST
    infoToast(message)
    return false
  }

  try {
    const { data: siblingData } = await apiPut<T>(`${apiEndpoint}?type=order`, {
      id,
      currentOrder,
      newOrder,
      direction
    })

    if (!siblingData) return false

    onSuccess(siblingData)
    return true
  } catch {
    errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    return false
  }
}

export function reorderTableData<T>(
  data: T[],
  targetId: string,
  siblingData: T,
  currentOrder: number,
  newOrder: number,
  idField: keyof T,
  orderField: keyof T
): T[] {
  const targetIdx = data.findIndex((item) => item[idField] === targetId)
  const siblingIdx = data.findIndex((item) => item[idField] === siblingData[idField])

  if (targetIdx === -1 || siblingIdx === -1) return data

  const newData = [...data]
  newData[targetIdx] = { ...siblingData, [orderField]: currentOrder }
  newData[siblingIdx] = { ...data[targetIdx], [orderField]: newOrder }

  return newData
}
