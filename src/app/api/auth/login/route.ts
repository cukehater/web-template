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
import { ALERT_MESSAGE } from '@/app/(cms)/_shared/lib'

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json()

    const user = await validateUser(userId, password)

    if (!user) {
      return NextResponse.json(ALERT_MESSAGE.LOGIN_ERROR, { status: 401 })
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

    const response = NextResponse.json(ALERT_MESSAGE.REQUEST_SUCCESS)

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
    return NextResponse.json(ALERT_MESSAGE.REQUEST_ERROR, { status: 500 })
  }
}
