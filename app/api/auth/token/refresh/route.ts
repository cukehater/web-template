import { ALERT_MESSAGES, resetHttpOnlyCookie, setHttpOnlyCookie } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

import {
  ACCESS_TOKEN_MAX_AGE,
  deleteAccountRefreshToken,
  getRefreshToken,
  REFRESH_TOKEN_MAX_AGE,
  rotateRefreshToken,
  verifyToken
} from '@/tokens'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const { refreshToken } = await request.json()

    if (!refreshToken) {
      const errorResponse = NextResponse.json(
        { message: ALERT_MESSAGES.REFRESH_TOKEN_EXPIRED, ok: false },
        { status: 400 }
      )
      resetHttpOnlyCookie(errorResponse)
      return errorResponse
    }

    const payload = await verifyToken(refreshToken)

    if (payload.type !== 'refresh') {
      const errorResponse = NextResponse.json(
        { message: ALERT_MESSAGES.REFRESH_TOKEN_TYPE_ERROR, ok: false },
        { status: 400 }
      )
      resetHttpOnlyCookie(errorResponse)
      return errorResponse
    }

    const currentRefreshToken = await getRefreshToken(payload.accountId)
    if (refreshToken !== currentRefreshToken) {
      const errorResponse = NextResponse.json(
        {
          message: ALERT_MESSAGES.REFRESH_TOKEN_MISMATCH,
          ok: false
        },
        { status: 400 }
      )
      resetHttpOnlyCookie(errorResponse)
      return errorResponse
    }

    await deleteAccountRefreshToken(payload.accountId)

    const { newAccessToken, newRefreshToken } = await rotateRefreshToken(refreshToken)

    const response = NextResponse.json(
      { message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true },
      { status: 200 }
    )
    setHttpOnlyCookie(response, 'accessToken', newAccessToken, ACCESS_TOKEN_MAX_AGE)
    setHttpOnlyCookie(response, 'refreshToken', newRefreshToken, REFRESH_TOKEN_MAX_AGE)

    return response
  } catch {
    const errorResponse = NextResponse.json(
      { message: ALERT_MESSAGES.REFRESH_TOKEN_ROTATION_FAILED, ok: false },
      { status: 500 }
    )
    resetHttpOnlyCookie(errorResponse)
    return errorResponse
  }
}
