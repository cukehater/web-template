import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponseType<string>>> {
  try {
    const accountId = req.nextUrl.searchParams.get('accountId')

    const refreshToken = await prisma.refreshToken.findFirst({
      where: { accountId: accountId as string },
      select: { token: true }
    })

    return NextResponse.json(
      { data: refreshToken?.token, message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
