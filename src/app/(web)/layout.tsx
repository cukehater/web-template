import '@/app/styles/web.css'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main>{children}</main>
}
