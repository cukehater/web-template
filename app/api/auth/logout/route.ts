import { ALERT_MESSAGES, setHttpOnlyCookie } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

import { deleteAccountRefreshToken, verifyToken } from '@/tokens'

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value

    const payload = await verifyToken(refreshToken as string)

    if (refreshToken) {
      await deleteAccountRefreshToken(payload.accountId)
    }

    const response = NextResponse.json(
      {
        message: ALERT_MESSAGES.REQUEST_SUCCESS,
        ok: true
      },
      {
        status: 200
      }
    )

    setHttpOnlyCookie(response, 'accessToken', '', 0)
    setHttpOnlyCookie(response, 'refreshToken', '', 0)

    return response
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
