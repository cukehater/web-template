import { ALERT_MESSAGE } from '@cms/shared/lib'
import {
  initialLoginFormData,
  loginFormSchema,
  LoginFormSchemaType,
} from '@cms/shared/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import login from './login'

export function useLogin() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: initialLoginFormData,
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
      setError(ALERT_MESSAGE.REQUEST_ERROR)
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit, isLoading, error }
}
