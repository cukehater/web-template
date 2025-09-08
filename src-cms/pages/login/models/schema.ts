import { ALERT_MESSAGES, REGEX } from '@cms/shared/lib'
import z from 'zod'

export const loginFormSchema = z.object({
  accountId: z
    .string()
    .nonempty(ALERT_MESSAGES.NONE_EMPTY)
    .regex(REGEX.ONLY_ENGLISH, ALERT_MESSAGES.ONLY_ENGLISH)
    .max(15, ALERT_MESSAGES.ID_LENGTH),
  password: z
    .string()
    .nonempty(ALERT_MESSAGES.NONE_EMPTY)
    .max(15, ALERT_MESSAGES.PASSWORD_MAX_LENGTH)
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>

export const initialLoginFormData: LoginFormSchemaType = {
  accountId: '',
  password: ''
}
