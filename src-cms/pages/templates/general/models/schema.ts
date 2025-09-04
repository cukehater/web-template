import { ALERT_MESSAGES } from '@cms/shared/lib'
import { z } from 'zod'

export const generalFormSchema = z.object({
  title: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  createdAt: z.union([z.date(), z.literal('')]),
  content: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  isVisible: z.boolean()
})

export type GeneralFormSchemaType = z.infer<typeof generalFormSchema>

export const initialGeneralFormData: GeneralFormSchemaType = {
  title: '',
  createdAt: '',
  content: '',
  isVisible: true
}
