'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, GalleryVerticalEnd, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Alert,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/app/(cms)/_shared/shadcn'

export default function LoginForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const formSchema = z.object({
    userId: z
      .string()
      .min(5, { message: '아이디는 5자 이상이어야 합니다.' })
      .max(20, { message: '아이디는 20자 이하여야 합니다.' }),
    password: z
      .string()
      .min(5, { message: '비밀번호는 5자 이상이어야 합니다.' })
      .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { userId, password } = values

    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        userId,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex h-screen flex-col w-screen items-center justify-center'>
      <Form {...form}>
        <form
          className='w-[90%] sm:w-96'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2'>
              <div className='flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground'>
                <GalleryVerticalEnd className='size-6' />
              </div>
              <h3 className='text-xl font-bold'>Administrator</h3>
            </div>
            <FormField
              control={form.control}
              name='userId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input placeholder='아이디를 입력하세요' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='비밀번호를 입력하세요'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type='submit'>
              {isLoading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                '로그인'
              )}
            </Button>

            {error && (
              <Alert variant='destructive'>
                <AlertCircleIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
