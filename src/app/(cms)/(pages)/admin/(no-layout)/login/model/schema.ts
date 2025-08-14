import z from 'zod'

export const formSchema = z.object({
  userId: z
    .string()
    .nonempty({ message: '아이디를 입력해주세요.' })
    .max(20, { message: '아이디는 20자 이하여야 합니다.' }),
  password: z
    .string()
    .nonempty({ message: '비밀번호를 입력해주세요.' })
    .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
})
