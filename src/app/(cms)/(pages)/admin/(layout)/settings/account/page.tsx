import { prisma } from '@/app/(cms)/_shared/lib'

import UserList from './ui/user-list'

export default async function AccountPage() {
  const userData = await prisma.user.findMany({
    where: {
      userId: {
        not: 'master',
      },
    },
  })

  const initialUsers = userData.map(user => ({
    ...user,
    createdAt: user.createdAt.toLocaleDateString('ko-KR'),
  }))

  return <UserList initialUsers={initialUsers} />
}
