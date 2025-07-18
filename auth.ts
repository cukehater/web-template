import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { validateCredentials } from './lib/auth-utils'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async credentials => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await validateCredentials(
          credentials.email as string,
          credentials.password as string,
        )

        if (!user) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },

    async signIn(params) {
      console.log('signIn', params)
      return true
    },
  },
  pages: {
    signIn: '/admin/login',
  },
})
