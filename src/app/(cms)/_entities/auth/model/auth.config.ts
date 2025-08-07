import { type NextAuthConfig, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

import {
  deleteUserRefreshTokens,
  generateAccessToken,
  generateRefreshToken,
  getTokenExpiry,
  rotateRefreshToken,
  saveRefreshToken,
} from '../lib/jwt'
import { validateCredentials } from '../lib/validateCredentials'

/**
 * NextAuth.js 설정
 * [동작 시나리오]
 * 사용자 로그인 → Access Token (15분) + Refresh Token (7일) 발급
 * 15분 후 → Access Token 만료, Refresh Token으로 자동 갱신
 * 7일 후 → Refresh Token 만료, 새로운 Refresh Token으로 로테이션
 * 1년 후 → NextAuth.js 세션 만료, 완전히 로그아웃
 */
export const AUTH_CONFIG = {
  /**
   * JWT 세션 전략 사용
   * 서버 측에서 세션을 저장하는 대신 클라이언트 측에서 토큰을 저장
   * maxAge: NextAuth.js가 관리하는 세션 자체의 최대 수명
   *        이 시간이 지나면 세션이 자동으로 만료되고 사용자는 자동으로 로그아웃 (갱신 불가능)
   */
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 365,
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

        // 기존 리프레시 토큰 삭제 & 새 리프레시 토큰 저장
        await deleteUserRefreshTokens(user.id)
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
        console.warn('🔄 초기 로그인 시')
        const accessTokenExpiry = await getTokenExpiry(
          user.accessToken as string,
        )

        return {
          ...token,
          userId: user.id,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpiry,
        }
      }

      // 엑세스 토큰이 유효한 경우
      if (Date.now() < (token.accessTokenExpiry as number)) {
        console.warn('✅ 엑세스 토큰 유효')
        return token
      }

      // 엑세스 토큰이 만료된 경우 리프레시 토큰 로테이션
      try {
        console.warn('🔄 리프레시 토큰 로테이션')
        const refreshTokenExpiry = await getTokenExpiry(
          token.refreshToken as string,
        )

        // 리프레시 토큰 만료 시간 검증
        if (Date.now() >= refreshTokenExpiry) {
          console.warn('❌ 리프레시 토큰 만료')
          return null
        }

        const { newAccessToken, newRefreshToken } = await rotateRefreshToken(
          token.refreshToken as string,
        )
        const newAccessTokenExpiry = await getTokenExpiry(newAccessToken)

        return {
          ...token,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          accessTokenExpiry: newAccessTokenExpiry,
        }
      } catch (error) {
        console.error('Error refreshing access token', error)
        return null
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          userId: token.userId as string,
          name: token.name as string,
        },
        accessToken: token.accessToken,
      }
    },
  },
  pages: {
    signIn: '/admin/login',
  },
} satisfies NextAuthConfig
