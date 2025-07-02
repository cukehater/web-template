import { FONT_NOTO_SANS_KR } from '@/public/fonts'
import './globals.css'
import StyleRegistry from './StyleRegistry'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko' className={FONT_NOTO_SANS_KR.variable}>
      <body>
        <StyleRegistry>{children}</StyleRegistry>
      </body>
    </html>
  )
}
