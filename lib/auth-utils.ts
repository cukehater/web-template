import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(
  email: string,
  password: string,
  name?: string,
) {
  const hashedPassword = await hashPassword(password)

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function validateCredentials(email: string, password: string) {
  const user = await getUserByEmail(email)

  if (!user) {
    return null
  }

  const isValidPassword = await verifyPassword(password, user.password)

  if (!isValidPassword) {
    return null
  }

  return user
}
