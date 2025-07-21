'use client'

import { GalleryVerticalEnd, Loader2 } from 'lucide-react'

import { Button, Input, Label } from '@/app/(cms)/_shared/shadcn'

import { useLogin } from '../model/useLogin'

export default function LoginForm() {
  const { isLoading, error, register, handleSubmit, onSubmit } = useLogin()

  return (
    <div className='flex h-screen flex-col w-screen items-center py-[50%]'>
      <form className='w-[90%] sm:w-96' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <div className='flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground'>
              <GalleryVerticalEnd className='size-6' />
            </div>
            <h1 className='text-xl font-bold'>Administrator</h1>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor='userId'>아이디</Label>
              <Input
                {...register('userId')}
                disabled={isLoading}
                id='userId'
                placeholder='아이디를 입력해 주세요.'
                type='userId'
              />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='password'>비밀번호</Label>
              <Input
                {...register('password')}
                disabled={isLoading}
                id='password'
                placeholder='비밀번호를 입력해 주세요.'
                type='password'
              />
            </div>
            <Button className='w-full' type='submit'>
              {isLoading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                '로그인'
              )}
            </Button>
          </div>
          {error && (
            <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md text-center'>
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
