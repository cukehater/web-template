import { NextRequest, NextResponse } from 'next/server'

import {
  ACCESS_TOKEN_MAX_AGE,
  deleteUserRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  REFRESH_TOKEN_MAX_AGE,
  saveRefreshToken,
  setHttpOnlyCookie,
  validateUser,
} from '@/app/(cms)/_entities/auth'

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json()

    const user = await validateUser(userId, password)

    if (!user) {
      return NextResponse.json(
        { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 },
      )
    }

    const accessToken = await generateAccessToken({
      id: user.id,
      userId: user.userId,
      name: user.name,
    })

    const refreshToken = await generateRefreshToken({
      id: user.id,
      userId: user.userId,
      name: user.name,
    })

    await deleteUserRefreshToken(user.userId)
    await saveRefreshToken(refreshToken, user.userId)

    const response = NextResponse.json({ success: true })

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
      { error: '로그인 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
