import bcrypt from 'bcryptjs'

import { prisma } from '@/app/(cms)/shared/lib'

const getUserByUserID = async (userId: string) => {
  return prisma.user.findUnique({
    where: { userId },
  })
}

const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export default async function validateUser(userId: string, password: string) {
  const user = await getUserByUserID(userId)

  if (!user) {
    return null
  }

  const isValidPassword = await verifyPassword(password, user.password)

  if (!isValidPassword) {
    return null
  }

  return user
}
