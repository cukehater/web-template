import { ALERT_MESSAGES, REGEX } from '@cms/shared/lib'
import z from 'zod'

export const loginFormSchema = z.object({
  userId: z
    .string()
    .nonempty(ALERT_MESSAGES.NONE_EMPTY)
    .regex(REGEX.ONLY_ENGLISH, ALERT_MESSAGES.ONLY_ENGLISH)
    .max(15, ALERT_MESSAGES.ID_LENGTH),
  password: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY).max(15, ALERT_MESSAGES.PASSWORD_LENGTH)
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>

export const initialLoginFormData: LoginFormSchemaType = {
  userId: '',
  password: ''
}
