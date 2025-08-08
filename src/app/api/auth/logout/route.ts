import { NextRequest, NextResponse } from 'next/server'

import { setHttpOnlyCookie } from '@/app/(cms)/_entities/auth'
import { deleteRefreshToken } from '@/app/(cms)/_entities/auth/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (refreshToken) {
      await deleteRefreshToken(refreshToken)
    }

    const response = NextResponse.json({ success: true })

    // 엑세스 토큰 & 리프레시 토큰 쿠키 삭제
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
