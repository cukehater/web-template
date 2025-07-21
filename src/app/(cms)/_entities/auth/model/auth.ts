import NextAuth, { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

import { validateCredentials } from '../lib/validateCredentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (
        credentials: Record<string, unknown>,
      ): Promise<User | null> => {
        if (!credentials?.userId || !credentials?.password) {
          return null
        }

        const user = await validateCredentials(
          credentials.userId as string,
          credentials.password as string,
        )

        if (!user) {
          return null
        }

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id as string
        token.userId = user.userId as string
        token.name = user.name as string
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string
        session.user.userId = token.userId as string
        session.user.name = token.name as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
})
