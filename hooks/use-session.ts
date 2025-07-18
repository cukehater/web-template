'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useRequireAuth(redirectTo = '/admin/login') {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push(redirectTo)
    }
  }, [session, status, router, redirectTo])

  return { session, status }
}

export function useRequireAdmin(redirectTo = '/admin/login') {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push(redirectTo)
      return
    }

    if (session.user.role !== 'ADMIN') {
      router.push(redirectTo)
    }
  }, [session, status, router, redirectTo])

  return { session, status }
}
