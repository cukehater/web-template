import { User as CustomUser } from '@/app/(cms)/_shared/model'

declare module 'next-auth' {
  interface Session {
    user: CustomUser
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    error?: 'RefreshTokenError'
  }

  interface User {
    userId: string
    name: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    name?: string
    accessToken?: string
    expiresAt?: number
    refreshToken?: string
    error?: 'RefreshTokenError'
  }
}
