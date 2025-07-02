'use client'

import { Layout, Menu } from 'antd'

const items = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}))

export default function Header() {
  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className='demo-logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Layout.Header>
  )
}
