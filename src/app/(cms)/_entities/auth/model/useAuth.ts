'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function useAuth() {
  const router = useRouter()

  // 로그인
  const login = async (userId: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ userId, password }),
    })

    if (response.ok) {
      const { user } = await response.json()
      return { user }
    } else {
      const error = await response.json()
      return error
    }
  }

  // 로그아웃
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      router.push('/admin/login')
    }
  }, [router])

  return { login, logout }
}
