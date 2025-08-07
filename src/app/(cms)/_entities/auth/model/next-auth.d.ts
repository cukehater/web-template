import { User as CustomUser } from '@/app/(cms)/_shared/model'

declare module 'next-auth' {
  interface Session {
    user: CustomUser
    accessToken?: string
    refreshToken?: string
    error?: 'RefreshTokenError'
  }

  interface User {
    userId: string
    name: string
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    name?: string
    accessToken?: string
    refreshToken?: string
    error?: 'RefreshTokenError'
  }
}
