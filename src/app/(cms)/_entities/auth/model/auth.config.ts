import { type NextAuthConfig, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

import {
  deleteUserRefreshTokens,
  generateAccessToken,
  generateRefreshToken,
  rotateRefreshToken,
  saveRefreshToken,
} from '../lib/jwt'
import { validateCredentials } from '../lib/validateCredentials'

export const AUTH_CONFIG = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 15,
  },
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

        const accessToken = await generateAccessToken({
          userId: user.id,
          name: user.name,
        })

        const refreshToken = await generateRefreshToken({
          userId: user.id,
          name: user.name,
        })

        // 기존 리프레시 토큰 삭제
        await deleteUserRefreshTokens(user.id)

        // 새 리프레시 토큰 저장
        await saveRefreshToken(refreshToken, user.id)

        return {
          ...user,
          accessToken,
          refreshToken,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // 초기 로그인 시
      if (user) {
        return {
          ...token,
          userId: user.id,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        }
      }

      // 토큰이 유효한 경우
      if (token.exp && Date.now() < token.exp * 1000) {
        console.log('✅ 토큰이 유효합니다.')
        console.log('token', new Date(token.exp * 1000))
        return token
      }

      // 토큰이 만료된 경우 리프레시 토큰 로테이션
      if (!token.refreshToken) {
        console.log('❌ 리프레시 토큰이 없습니다.')
        token.error = 'RefreshTokenError'
        return token
      }

      try {
        console.log('🔄 리프레시 토큰 로테이션 시작')
        console.log('token.refreshToken', token.refreshToken)

        const { newAccessToken, newRefreshToken } = await rotateRefreshToken(
          token.refreshToken,
        )

        return {
          ...token,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          exp: Math.floor(Date.now() / 1000) + 60 * 15,
          error: undefined, // 에러 초기화
        }
      } catch (error) {
        console.error('Error refreshing access token', error)
        token.error = 'RefreshTokenError'
        return token
      }
    },
    // async session({ session, token }) {
    //   // 세션에 에러 전달
    //   session.error = token.error

    //   // 토큰 정보를 세션에 포함
    //   session.accessToken = token.accessToken
    //   session.refreshToken = token.refreshToken
    //   session.user.id = token.userId
    //   session.user.name = token.name

    //   return session
    // },
    // async signOut({ token }) {
    //   // 로그아웃 시 리프레시 토큰 삭제
    //   if (token.userId) {
    //     await deleteUserRefreshTokens(token.userId as string)
    //   }
    // },
  },
  pages: {
    signIn: '/admin/login',
  },
} satisfies NextAuthConfig
