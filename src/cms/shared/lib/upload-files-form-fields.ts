import { ALERT_MESSAGE, errorToast } from '.'

export const uploadFilesFormFields = async function <T>(
  values: T,
  fields: (keyof T)[],
) {
  const formData = new FormData()
  for (const key of fields) {
    if (values[key] && values[key] instanceof File) {
      formData.append(key as string, values[key] as unknown as File)
    }
  }

  const uploadRes = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!uploadRes.ok) {
    errorToast(ALERT_MESSAGE.REQUEST_ERROR)
    return
  }

  return await uploadRes.json()
}
