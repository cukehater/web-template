import z from 'zod'

export const formSchema = z.object({
  userId: z
    .string()
    .max(20, { message: '아이디는 20자 이하여야 합니다.' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: '아이디는 영문과 숫자만 사용할 수 있습니다.',
    }),
  password: z.string().max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
})
