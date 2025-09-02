import { apiPost, uploadFilesFormFields } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast, hasFormChange, infoToast, successToast } from '@cms/shared/lib'
import { UploadResponseType } from '@cms/shared/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { basicFormSchema, BasicFormSchemaType } from './schema'

export default function useBasicForm(defaultValues: BasicFormSchemaType) {
  const router = useRouter()
  const form = useForm<BasicFormSchemaType>({
    resolver: zodResolver(basicFormSchema),
    defaultValues
  })

  async function onSubmit(values: BasicFormSchemaType) {
    try {
      const watchedValues = form.watch()

      if (!hasFormChange(watchedValues, defaultValues)) {
        infoToast(ALERT_MESSAGES.NO_CHANGES)
        return
      }

      const uploadImageValues = (await uploadFilesFormFields(values, [
        'logo',
        'favicon',
        'ogImage'
      ])) as UploadResponseType

      const result = await apiPost('/api/basic', {
        body: {
          ...values,
          ...uploadImageValues
        }
      })

      if (!result.ok) {
        errorToast(ALERT_MESSAGES.SAVE_ERROR)
        return
      }

      successToast(ALERT_MESSAGES.SAVE_SUCCESS)
      form.reset({ ...values, ...uploadImageValues })
      router.refresh()
    } catch {
      errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    }
  }

  return { form, onSubmit }
}
