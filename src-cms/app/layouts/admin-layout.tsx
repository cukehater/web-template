import { SessionProvider } from '@cms/shared/context'
import { Toaster } from '@cms/shared/ui/shadcn'
import React from 'react'

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
