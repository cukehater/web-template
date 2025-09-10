import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const { accountId } = await req.json()

    await prisma.refreshToken.deleteMany({
      where: { accountId }
    })

    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
