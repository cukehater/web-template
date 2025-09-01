import { deleteUserRefreshToken, verifyToken } from '@cms/app/tokens'
import { setHttpOnlyCookie } from '@cms/shared/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value

    const payload = await verifyToken(refreshToken as string)

    if (refreshToken) {
      await deleteUserRefreshToken(payload.userId)
    }

    const response = NextResponse.json({ success: true })

    setHttpOnlyCookie(response, 'accessToken', '', 0)
    setHttpOnlyCookie(response, 'refreshToken', '', 0)

    return response
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
