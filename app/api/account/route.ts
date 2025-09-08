import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { AccountType, ApiResponseType } from '@cms/shared/models'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse<ApiResponseType<AccountType[]>>> => {
  try {
    const data = await prisma.account.findMany({
      where: { accountId: { not: 'master' } },
      select: {
        id: true,
        accountId: true,
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
    const body = await req.json()

    const account = await prisma.account.findUnique({
      where: { id: body.id }
    })

    if (!account) {
      return NextResponse.json(
        { message: ALERT_MESSAGES.REQUEST_ERROR, ok: false },
        { status: 404 }
      )
    }

    const isPasswordMatch = await bcrypt.compare(body.password, account.password)

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: ALERT_MESSAGES.PASSWORD_NOT_MATCH_CURRENT, ok: false },
        { status: 400 }
      )
    }

    await prisma.account.update({
      where: { id: body.id },
      data: {
        password: await bcrypt.hash(body.newPassword, 10)
      }
    })

    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
