import { Header, Sidebar } from '@/app/(cms)/widgets'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='flex'>
        <Sidebar />
        <div className='p-4'>{children}</div>
      </div>
    </>
  )
}
