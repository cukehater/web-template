'use client'

import { Account } from '@prisma/client'
import { createContext, useContext, useEffect, useState } from 'react'

import { apiGet } from '../api'

const SessionContext = createContext<{
  session: Pick<Account, 'name' | 'accountId'> | null
  isLoading: boolean
  refetchSession: () => Promise<void>
} | null>(null)

interface SessionProviderPropsType {
  children: React.ReactNode
}

export function SessionProvider({ children }: SessionProviderPropsType) {
  const [isLoading, setIsLoading] = useState(false)
  const [session, setSession] = useState<Pick<Account, 'name' | 'accountId'> | null>(null)

  const fetchSession = async () => {
    const { data } = await apiGet('/api/auth/me', {
      credentials: 'include'
    })
    setSession(data as Pick<Account, 'name' | 'accountId'>)
  }

  const refetchSession = async () => {
    setIsLoading(true)
    await fetchSession()
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return (
    <SessionContext.Provider value={{ session, isLoading, refetchSession }}>
      {children}
    </SessionContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSessionContext() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSessionContext는 SessionProvider 내에서 사용되어야 합니다.')
  }

  return context
}
