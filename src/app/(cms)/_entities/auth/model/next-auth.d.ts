import { Role } from '../../generated/prisma'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name?: string
    role: Role
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role: Role
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}
