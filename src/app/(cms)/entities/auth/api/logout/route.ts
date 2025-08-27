import { NextRequest, NextResponse } from 'next/server'

import { setHttpOnlyCookie } from '@/app/(cms)/entities/auth'
import {
  deleteUserRefreshToken,
  verifyToken,
} from '@/app/(cms)/entities/auth/model/jwt'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    const payload = await verifyToken(refreshToken as string)

    if (refreshToken) {
      await deleteUserRefreshToken(payload.userId)
    }

    const response = NextResponse.json({ success: true })

    setHttpOnlyCookie(response, 'accessToken', '', 0)
    setHttpOnlyCookie(response, 'refreshToken', '', 0)

    return response
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
