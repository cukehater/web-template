import { NextRequest, NextResponse } from 'next/server'

import {
  ACCESS_TOKEN_MAX_AGE,
  getRefreshTokenFromDB,
  REFRESH_TOKEN_MAX_AGE,
  rotateRefreshToken,
  setHttpOnlyCookie,
  verifyToken,
} from '@/app/(cms)/_entities/auth'

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 },
      )
    }

    const payload = await verifyToken(refreshToken)
    const currentRefreshToken = await getRefreshTokenFromDB(payload.userId)

    console.log('refreshToken', refreshToken)
    console.log('currentRefreshToken', currentRefreshToken)

    if (refreshToken !== currentRefreshToken) {
      console.log('❌ 리프레시 토큰 불일치')

      // TODO: 쿠키 초기화

      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 },
      )
    }

    // 토큰 로테이션
    const { newAccessToken, newRefreshToken } =
      await rotateRefreshToken(refreshToken)

    // 응답 객체 생성
    const response = NextResponse.json({
      success: true,
      message: 'Tokens refreshed successfully',
    })

    // 새로운 토큰을 쿠키에 설정
    setHttpOnlyCookie(
      response,
      'accessToken',
      newAccessToken,
      ACCESS_TOKEN_MAX_AGE,
    )
    setHttpOnlyCookie(
      response,
      'refreshToken',
      newRefreshToken,
      REFRESH_TOKEN_MAX_AGE,
    )

    return response
  } catch (error) {
    console.error('Token refresh failed:', error)
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 })
  }
}
