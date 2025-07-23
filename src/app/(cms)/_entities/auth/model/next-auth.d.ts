import { User } from '@//app/(cms)/_shared/model'

declare module 'next-auth' {
  interface Session {
    user: User
  }

  interface User {
    userId: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
  }
}
