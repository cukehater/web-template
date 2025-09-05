import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { AccountType, ApiResponseType } from '@cms/shared/models'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse<ApiResponseType<AccountType[]>>> => {
  try {
    const data = await prisma.user.findMany({
      where: { userId: { not: 'master' } },
      select: {
        userId: true,
        name: true,
        createdAt: true
      }
    })

    return NextResponse.json(
      {
        data: data as AccountType[],
        message: ALERT_MESSAGES.REQUEST_SUCCESS,
        ok: true
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}

export const PATCH = async (req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> => {
  try {
    const payload = await req.json()
    await prisma.user.update({
      where: { id: payload.id },
      data: {
        name: payload.name,
        password: await bcrypt.hash(payload.newPassword, 10)
      }
    })

    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
