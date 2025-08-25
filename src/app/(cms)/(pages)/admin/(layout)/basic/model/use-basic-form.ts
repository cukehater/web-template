import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
  ALERT_MESSAGE,
  errorToast,
  infoToast,
  successToast,
} from '@/app/(cms)/_shared/lib'
import {
  basicFormSchema,
  BasicFormSchemaType,
} from '@/app/(cms)/_shared/schema'

const FILE_FIELDS = ['logo', 'favicon', 'ogImage'] as const

export function useBasicForm(defaultValues: BasicFormSchemaType) {
  const router = useRouter()

  const form = useForm<BasicFormSchemaType>({
    resolver: zodResolver(basicFormSchema),
    defaultValues,
  })

  async function onSubmit(values: BasicFormSchemaType) {
    try {
      const watchedValues = form.watch()
      const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(defaultValues)

      if (!hasChanges) {
        infoToast(ALERT_MESSAGE.NO_CHANGES)
        return
      }

      const fileFormData = new FormData()
      FILE_FIELDS.forEach(key => {
        fileFormData.append(key, values[key] || '')
      })

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: fileFormData,
      })

      if (!uploadRes.ok) {
        const errorMessage = await uploadRes.json()
        errorToast(errorMessage || ALERT_MESSAGE.REQUEST_ERROR)
        return
      }

      const uploadImageValues = await uploadRes.json()

      const res = await fetch('/api/basic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          ...uploadImageValues,
        }),
      })

      if (!res.ok) {
        errorToast(ALERT_MESSAGE.SAVE_ERROR)
        return
      }

      successToast(ALERT_MESSAGE.SAVE_SUCCESS)
      form.reset({ ...values, ...uploadImageValues })

      router.refresh()
    } catch {
      errorToast(ALERT_MESSAGE.REQUEST_ERROR)
    }
  }

  return { form, onSubmit }
}
