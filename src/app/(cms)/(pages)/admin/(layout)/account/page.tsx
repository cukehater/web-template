import { prisma } from '@/app/(cms)/_shared/lib'

import AccountTable from './ui/account-table'

export default async function AccountPage() {
  const initialUsers = await prisma.user.findMany({
    where: {
      userId: {
        not: 'master',
      },
    },
  })

  return <AccountTable initialUsers={initialUsers} />
}
