import { User as CustomUser } from '@/app/(cms)/_shared/model'

declare module 'next-auth' {
  interface Session {
    user: CustomUser
  }

  interface User {
    userId: string
    name: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    name: string
  }
}
