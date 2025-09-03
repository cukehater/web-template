import { apiPut } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast } from '@cms/shared/lib'

interface ToggleVisibilityParamsType<T> {
  id: string
  isVisible: boolean
  apiEndpoint: string
  onSuccess: (updatedData: T[]) => void
  currentData: T[]
  idField: keyof T
  visibleField: keyof T
}

export async function handleTableVisibleToggle<T>({
  id,
  isVisible,
  apiEndpoint,
  onSuccess,
  currentData,
  idField,
  visibleField
}: ToggleVisibilityParamsType<T>) {
  try {
    await apiPut<T>(`${apiEndpoint}?type=visible`, {
      id,
      isVisible: !isVisible
    })

    const updatedData = currentData.map((item) => {
      if (item[idField] === id) {
        return { ...item, [visibleField]: !isVisible }
      }
      return item
    })

    onSuccess(updatedData)
    return true
  } catch {
    errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    return false
  }
}
