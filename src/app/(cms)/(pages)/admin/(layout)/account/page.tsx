import { UserCog2 } from 'lucide-react'

import { prisma } from '@/app/(cms)/shared/lib'
import { PageTopTitle } from '@/app/(cms)/shared/ui'

import AccountTable from './ui/account-table'

export default async function AccountPage() {
  const initialUsers = await prisma.user.findMany({
    where: {
      userId: {
        not: 'master',
      },
    },
  })

  return (
    <>
      <PageTopTitle
        description='사이트 관리자 계정을 관리합니다.'
        icon={UserCog2}
        title='관리자 계정 관리'
      />
      <AccountTable initialUsers={initialUsers} />
    </>
  )
}
