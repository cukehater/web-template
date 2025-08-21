import { FONT_NOTO_SANS_KR } from '@/../public/fonts'

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
