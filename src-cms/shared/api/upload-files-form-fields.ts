import { errorToast } from '../lib/toasts'
import { apiPost } from './api-clients'

export const uploadFilesFormFields = async function <T>(values: T, fields: (keyof T)[]) {
  const formData = new FormData()

  for (const key of fields) {
    if (values[key] && values[key] instanceof File) {
      formData.append(key as string, values[key] as unknown as File)
    }
  }

  const result = await apiPost('/api/upload', formData)

  if (!result.ok) {
    errorToast(result.message)
    return
  }

  return result.data
}
