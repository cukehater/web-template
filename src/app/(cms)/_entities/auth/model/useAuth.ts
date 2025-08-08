'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { User } from '@/app/(cms)/_shared/model'

interface Auth {
  user: User | null
  isLoading: boolean
}

export default function useAuth() {
  const [auth, setAuth] = useState<Auth>({
    user: null,
    isLoading: true,
  })

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
      localStorage.setItem('user', JSON.stringify(user))
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
      localStorage.removeItem('user')
      router.push('/admin/login')
    }
  }, [router])

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        setAuth({ user: parsedUser, isLoading: false })
      } catch (error) {
        console.error('Invalid user data in localStorage:', error)
        localStorage.removeItem('user')
        router.push('/admin/login')
      }
    } else {
      setAuth({ user: null, isLoading: false })
      logout()
    }
  }, [router, logout])

  return { auth, login, logout }
}
