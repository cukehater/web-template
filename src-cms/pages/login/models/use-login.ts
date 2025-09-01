import { apiPost } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { initialLoginFormData, loginFormSchema, LoginFormSchemaType } from './login-form-schema'

export default function UseLogin() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: initialLoginFormData
  })

  async function onSubmit(values: LoginFormSchemaType) {
    if (isLoading) return

    setIsLoading(true)

    const { userId, password } = values

    try {
      const result = await apiPost('/api/auth/login', {
        body: { userId, password },
        credentials: 'include'
      })

      if (!result.ok) {
        setError(result.message)
        return
      }

      router.push('/admin')
    } catch {
      setError(ALERT_MESSAGES.REQUEST_ERROR)
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit, isLoading, error }
}
