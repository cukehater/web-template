import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { login } from '@/app/(cms)/_features/login'

import { loginFormSchema, LoginFormSchemaType } from './schema'

export function useLogin() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  async function onSubmit(values: LoginFormSchemaType) {
    if (isLoading) return

    setIsLoading(true)

    const { userId, password } = values

    try {
      const result = await login(userId, password)

      if (result?.error) {
        setError(result.error)
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
