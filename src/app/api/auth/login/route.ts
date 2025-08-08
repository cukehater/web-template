import { NextRequest, NextResponse } from 'next/server'

import {
  ACCESS_TOKEN_MAX_AGE,
  deleteUserRefreshTokens,
  generateAccessToken,
  generateRefreshToken,
  REFRESH_TOKEN_MAX_AGE,
  saveRefreshToken,
  setHttpOnlyCookie,
  validateCredentials,
} from '@/app/(cms)/_entities/auth'

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json()

    // 사용자 인증
    const user = await validateCredentials(userId, password)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      )
    }

    // 토큰 생성
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

    // 응답 설정
    const response = NextResponse.json({
      user: {
        userId: user.userId,
        name: user.name,
      },
    })

    // 엑세스 토큰 & 리프레시 토큰을 HTTP-only 쿠키로 설정
    setHttpOnlyCookie(
      response,
      'accessToken',
      accessToken,
      ACCESS_TOKEN_MAX_AGE,
    )
    setHttpOnlyCookie(
      response,
      'refreshToken',
      refreshToken,
      REFRESH_TOKEN_MAX_AGE,
    )

    return response
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
