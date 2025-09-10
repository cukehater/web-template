import { ALERT_MESSAGES, REGEX } from '@cms/shared/lib'
import { z } from 'zod'

export const passwordUpdateFormSchema = z
  .object({
    password: z
      .string()
      .nonempty(ALERT_MESSAGES.NONE_EMPTY)
      .max(15, ALERT_MESSAGES.PASSWORD_MAX_LENGTH),
    newPassword: z
      .string()
      .nonempty(ALERT_MESSAGES.NONE_EMPTY)
      .min(8, ALERT_MESSAGES.PASSWORD_MIN_LENGTH)
      .max(15, ALERT_MESSAGES.PASSWORD_MAX_LENGTH)
      .regex(REGEX.PASSWORD_PATTERN, ALERT_MESSAGES.PASSWORD_PATTERN),
    confirmPassword: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY)
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: ALERT_MESSAGES.PASSWORD_MATCH,
    path: ['confirmPassword']
  })
  .refine((data) => data.password !== data.newPassword, {
    message: ALERT_MESSAGES.PASSWORD_NOT_MATCH,
    path: ['newPassword']
  })

export type PasswordUpdateFormSchemaType = z.infer<typeof passwordUpdateFormSchema>

export const initialPasswordUpdateFormData: PasswordUpdateFormSchemaType = {
  password: '',
  newPassword: '',
  confirmPassword: ''
}

export const nameUpdateFormSchema = z.object({
  name: z
    .string()
    .nonempty(ALERT_MESSAGES.NONE_EMPTY)
    .regex(REGEX.NO_SPECIAL_CHARACTER, ALERT_MESSAGES.NO_SPECIAL_CHARACTER)
})

export type NameUpdateFormSchemaType = z.infer<typeof nameUpdateFormSchema>

export const initialNameUpdateFormData: NameUpdateFormSchemaType = {
  name: ''
}
