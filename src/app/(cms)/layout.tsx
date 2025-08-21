import '@/app/styles/cms.css'

import { Toaster } from './_shared/shadcn'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
