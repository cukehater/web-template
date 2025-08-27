import z from 'zod'

import { ALERT_MESSAGE, REGEX } from '@/app/(cms)/shared/lib'

export const loginFormSchema = z.object({
  userId: z
    .string()
    .nonempty(ALERT_MESSAGE.NONE_EMPTY)
    .regex(REGEX.ONLY_ENGLISH, ALERT_MESSAGE.ONLY_ENGLISH)
    .max(15, ALERT_MESSAGE.ID_LENGTH),
  password: z
    .string()
    .nonempty(ALERT_MESSAGE.NONE_EMPTY)
    .max(15, ALERT_MESSAGE.PASSWORD_LENGTH),
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>

export const initialLoginFormData: LoginFormSchemaType = {
  userId: '',
  password: '',
}
