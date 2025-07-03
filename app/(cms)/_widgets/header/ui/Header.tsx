'use client'

import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Layout } from 'antd'
import Link from 'next/link'

export default function Header() {
  return (
    <Layout.Header className='p-0 border-b border-gray-100 px-4 flex items-center'>
      <Link href='/admin'>
        <Flex gap='small' align='center'>
          <div className='w-32 h-8 bg-slate-700 rounded-sm' />
          <h1 className='text-2xl font-medium text-white'>Admin</h1>
        </Flex>
      </Link>
      <div className='ml-auto flex items-center mr-4'>
        <Avatar size='small' icon={<UserOutlined />} />
        {/* //TODO: 로그인 정보 추가 */}
        <p className='text-white'>admin</p>
      </div>
      <Flex gap='small'>
        <Button type='primary' size='small' href='/'>
          Home
        </Button>
        <Button type='default' size='small'>
          Logout
        </Button>
      </Flex>
    </Layout.Header>
  )
}
