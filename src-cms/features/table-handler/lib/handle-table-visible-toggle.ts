import { apiPut } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast } from '@cms/shared/lib'

interface VisibleToggleParamsType {
  table: string
  id: string
  isVisible: boolean
  onSuccess?: () => void
}

export async function handleTableVisibleToggle<T>({
  table,
  id,
  isVisible,
  onSuccess = () => {}
}: VisibleToggleParamsType) {
  try {
    await apiPut<T>(`/api/post?table=${table}&type=visible`, {
      id,
      isVisible: !isVisible
    })

    onSuccess()
  } catch {
    errorToast(ALERT_MESSAGES.REQUEST_ERROR)
  }
}

export const visibleToggleSuccess = <T extends { id: string; isVisible: boolean }>(
  setter: React.Dispatch<React.SetStateAction<T[]>>,
  id: string
) => {
  return setter((prev) => {
    return prev.map((item) => {
      if (item.id === id) {
        return { ...item, isVisible: !item.isVisible }
      }
      return item
    })
  })
}
