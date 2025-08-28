import AccountTable from '@cms/(pages)/(session)/account/ui/account-table'
import { prisma } from '@cms/shared/lib'
import { PageTopTitle } from '@cms/shared/ui'
import { UserCog2 } from 'lucide-react'

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
