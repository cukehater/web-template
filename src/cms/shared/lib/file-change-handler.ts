import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { ALERT_MESSAGE, ALLOWED_TYPES, errorToast } from '.'

export const fileChangeHandler = <T extends FieldValues>(
  e: React.ChangeEvent<HTMLInputElement>,
  {
    allowedFormat,
    maxSize,
    field,
  }: {
    allowedFormat: keyof typeof ALLOWED_TYPES
    maxSize: number
    field: ControllerRenderProps<T, Path<T>>
  },
) => {
  const file = e.target.files?.[0]
  if (!file) return

  const isAllowedFormat = ALLOWED_TYPES[allowedFormat].includes(file.type)

  if (!isAllowedFormat) {
    e.target.value = ''
    errorToast(ALERT_MESSAGE.FILE_FORMAT)
    return
  }

  if (file.size > maxSize) {
    e.target.value = ''
    errorToast(`${ALERT_MESSAGE.FILE_SIZE}`)
    return
  }

  return field.onChange(file)
}
