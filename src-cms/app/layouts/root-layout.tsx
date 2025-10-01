import { FONT_NOTO_SANS_KR } from '@/assets/fonts'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={FONT_NOTO_SANS_KR.variable} lang="ko">
      <body>{children}</body>
    </html>
  )
}
