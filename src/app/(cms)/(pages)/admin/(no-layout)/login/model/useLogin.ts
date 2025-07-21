import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { LoginFormType } from './types'

export const useLogin = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit } = useForm<LoginFormType>()

  const onSubmit: SubmitHandler<LoginFormType> = async ({
    userId,
    password,
  }) => {
    if (!userId || !password) {
      setError('아이디와 비밀번호를 입력해 주세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        userId,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    register,
    handleSubmit,
    onSubmit,
  }
}
