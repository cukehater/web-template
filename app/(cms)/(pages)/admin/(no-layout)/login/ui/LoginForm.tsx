'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/app/(cms)/_shared/ui/button'
import { Input } from '@/app/(cms)/_shared/ui/input'
import { Loader2 } from 'lucide-react'

interface LoginFormData {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value,
      }))
    }

  return (
    <div className='w-full max-w-md space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>관리자 로그인</h1>
        <p className='text-gray-500'>계정 정보를 입력해주세요</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && (
          <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
            {error}
          </div>
        )}

        <div className='space-y-2'>
          <label htmlFor='email' className='text-sm font-medium'>
            이메일
          </label>
          <Input
            id='email'
            type='email'
            placeholder='admin@example.com'
            value={formData.email}
            onChange={handleInputChange('email')}
            required
            disabled={isLoading}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='password' className='text-sm font-medium'>
            비밀번호
          </label>
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            value={formData.password}
            onChange={handleInputChange('password')}
            required
            disabled={isLoading}
          />
        </div>

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          로그인
        </Button>
      </form>
    </div>
  )
}
