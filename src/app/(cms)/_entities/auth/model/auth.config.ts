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

        // 여기서 실제로는 JWT 토큰을 생성해야 합니다
        // 현재는 임시로 더미 토큰을 생성합니다
        const accessToken = `access_${Date.now()}`
        const refreshToken = `refresh_${Date.now()}`
        const expiresAt = Math.floor(Date.now() / 1000) + 15 * 60 // 15분

        return {
          ...user,
          accessToken,
          refreshToken,
          expiresAt,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 15, // 15분
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        // 첫 로그인 성공 시 토큰 발급
        return {
          ...token,
          userId: user.userId,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
        }
      } else if (token.expiresAt && Date.now() < token.expiresAt * 1000) {
        // access_token 유효한 경우
        return token
      } else {
        if (!token.refreshToken) {
          token.error = 'RefreshTokenError'
          return token
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                refreshToken: token.refreshToken,
              }),
            },
          )

          const tokenOrError = await response.json()

          if (!response.ok) throw new Error('Fetch refresh token failed')

          const newTokens = tokenOrError as {
            accessToken: string
            refreshToken?: string
            expiresIn: number
          }

          return {
            ...token,
            accessToken: newTokens.accessToken,
            expiresAt: Math.floor(Date.now() / 1000 + newTokens.expiresIn),
            refreshToken: newTokens.refreshToken || token.refreshToken,
          }
        } catch (error) {
          console.error('Error refreshing token', error)
          token.error = 'RefreshTokenError'
          return token
        }
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          userId: token.userId || '',
          name: token.name || '',
        }
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.expiresAt = token.expiresAt
        session.error = token.error
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
} satisfies NextAuthConfig
