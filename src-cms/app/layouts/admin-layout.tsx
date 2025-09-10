import { Toaster } from '@cms/shared/shadcn'
import React from 'react'

import { SessionProvider } from '../context/session-context'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  )
}
