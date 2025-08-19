import z from 'zod'

export const loginFormSchema = z.object({
  userId: z
    .string()
    .nonempty({ message: '아이디를 입력해 주세요.' })
    .max(15, { message: '아이디는 15자 이하여야 합니다.' }),
  password: z
    .string()
    .nonempty({ message: '비밀번호를 입력해 주세요.' })
    .max(15, { message: '비밀번호는 15자 이하여야 합니다.' }),
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>
