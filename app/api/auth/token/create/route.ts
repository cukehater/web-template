import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

import { REFRESH_TOKEN_MAX_AGE } from '@/tokens'

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const { token, accountId } = await req.json()
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE * 1000)

    await prisma.refreshToken.create({
      data: {
        token,
        accountId,
        expiresAt
      }
    })

    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
