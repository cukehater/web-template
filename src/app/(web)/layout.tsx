import { FONT_NOTO_SANS_KR } from '@/public/fonts'
import './assets/styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko' className={FONT_NOTO_SANS_KR.variable}>
      <body>{children}</body>
    </html>
  )
}
