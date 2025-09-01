import { errorToast } from '../lib/toasts'

export const uploadFilesFormFields = async function <T>(values: T, fields: (keyof T)[]) {
  const formData = new FormData()

  for (const key of fields) {
    if (values[key] && values[key] instanceof File) {
      formData.append(key as string, values[key] as unknown as File)
    }
  }

  // TODO: Form data
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  }).then((res) => res.json())

  if (!res.ok) {
    errorToast(res.message)
    return
  }

  return res.data
}
