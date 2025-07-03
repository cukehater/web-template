import { FONT_NOTO_SANS_KR } from '@/public/fonts'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko' className={FONT_NOTO_SANS_KR.variable}>
      <body>
        <AntdRegistry layer>
          <ConfigProvider>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
