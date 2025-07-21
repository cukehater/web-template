import { SessionProvider } from 'next-auth/react'

import { auth } from '../../_entities/auth'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  console.log('session', session)

  return <SessionProvider>{children}</SessionProvider>
}
