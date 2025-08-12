import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { login } from '@/app/(cms)/_entities/auth'

import { formSchema } from './schema'

export function useLogin() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return

    setIsLoading(true)

    const { userId, password } = values

    try {
      const result = await login(userId, password)

      if (result?.error) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.')
        return
      }

      router.push('/admin')
    } catch {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit, isLoading, error }
}
