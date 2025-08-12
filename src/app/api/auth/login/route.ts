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
        { error: 'Invalid credentials' },
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
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
