import { Layout as AntdLayout } from 'antd'
import { Header, Sidebar, Breadcrumb } from '../../_widgets'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AntdLayout>
      <Header />
      <AntdLayout>
        <Sidebar />
        <AntdLayout className='p-4'>
          <Breadcrumb />
          <div className='p-4 flex-1 bg-white rounded-md overflow-hidden w-68'>
            {children}
          </div>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  )
}
