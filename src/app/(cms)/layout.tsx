import './globals.css'

import { FONT_NOTO_SANS_KR } from '@/../public/fonts'

import { Toaster } from './_shared/shadcn'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={FONT_NOTO_SANS_KR.variable} lang='ko'>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
