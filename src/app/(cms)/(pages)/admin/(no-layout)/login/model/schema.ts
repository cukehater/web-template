import z from 'zod'

export const formSchema = z.object({
  userId: z
    .string()
    .min(5, { message: '아이디는 5자 이상이어야 합니다.' })
    .max(20, { message: '아이디는 20자 이하여야 합니다.' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: '아이디는 영문과 숫자만 사용할 수 있습니다.',
    }),
  password: z
    .string()
    .min(5, { message: '비밀번호는 5자 이상이어야 합니다.' })
    .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
})
