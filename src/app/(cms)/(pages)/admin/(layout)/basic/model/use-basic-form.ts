import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { uploadFilesFormFields } from '@/app/(cms)/_shared/api'
import {
  ALERT_MESSAGE,
  errorToast,
  hasFormChange,
  infoToast,
  successToast,
} from '@/app/(cms)/_shared/lib'
import {
  basicFormSchema,
  BasicFormSchemaType,
} from '@/app/(cms)/_shared/schema'

export function useBasicForm(defaultValues: BasicFormSchemaType) {
  const router = useRouter()
  const form = useForm<BasicFormSchemaType>({
    resolver: zodResolver(basicFormSchema),
    defaultValues,
  })

  async function onSubmit(values: BasicFormSchemaType) {
    try {
      const watchedValues = form.watch()

      if (!hasFormChange(watchedValues, defaultValues)) {
        infoToast(ALERT_MESSAGE.NO_CHANGES)
        return
      }

      const uploadImageValues =
        await uploadFilesFormFields<BasicFormSchemaType>(values, [
          'logo',
          'favicon',
          'ogImage',
        ])

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
