'use client'

import '@/app/styles/reset.css'
import '@/app/styles/tailwind.css'

import { OctagonX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
      <div className='w-full space-y-6 text-center'>
        <div className='space-y-3'>
          <h1 className='flex items-center justify-center gap-2 text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce'>
            <OctagonX className='size-10' /> ERROR!
          </h1>
          <h2 className='text-2xl font-bold'>에러가 발생했습니다.</h2>
          <p className='text-gray-500'>Error: {error.message}</p>
        </div>
        <div className='flex gap-2 justify-center'>
          <button
            className='inline-flex h-10 items-center rounded-md border border-black bg-white px-8 text-sm font-medium shadow transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
            type='button'
            onClick={() => router.back()}
          >
            뒤로가기
          </button>
          <button
            className='inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
            type='button'
            onClick={() => reset()}
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  )
}
