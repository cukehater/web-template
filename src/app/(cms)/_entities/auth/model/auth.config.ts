import { type NextAuthConfig, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

import { validateCredentials } from '../lib/validateCredentials'

export const AUTH_CONFIG = {
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
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id
        token.userId = user.userId
        token.name = user.name
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          userId: token.userId,
          name: token.name,
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
} satisfies NextAuthConfig
