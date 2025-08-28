import '@/app/assets/styles'

import { FONT_NOTO_SANS_KR } from '@/app/assets/fonts'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={FONT_NOTO_SANS_KR.variable} lang='ko'>
      <body>{children}</body>
    </html>
  )
}
