import { ALERT_MESSAGES } from '@cms/shared/lib'
import { z } from 'zod'

export const generalFormSchema = z.object({
  title: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  writer: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  content: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  isVisible: z.boolean(),
  createdAt: z.union([z.date(), z.literal('')])
})

export type GeneralFormSchemaType = z.infer<typeof generalFormSchema>

export const initialGeneralFormData: GeneralFormSchemaType = {
  title: '',
  content: '',
  writer: '',
  isVisible: true,
  createdAt: ''
}
