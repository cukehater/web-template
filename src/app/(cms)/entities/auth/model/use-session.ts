'use client'

import { useEffect, useState } from 'react'

import { User } from '@/app/(cms)/shared/model'

export default function useSession() {
  const [session, setSession] = useState<{
    session: User | null
    isLoading: boolean
  }>({
    session: null,
    isLoading: true,
  })

  const fetchUserInfoByToken = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setSession({ session: data, isLoading: false })
      } else {
        setSession({ session: null, isLoading: false })
      }
    } catch {
      setSession({ session: null, isLoading: false })
    }
  }

  useEffect(() => {
    fetchUserInfoByToken()
  }, [])

  return session
}
