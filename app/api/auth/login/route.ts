import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES, setHttpOnlyCookie } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import {
  ACCESS_TOKEN_MAX_AGE,
  createRefreshToken,
  deleteAccountRefreshToken,
  generateToken,
  REFRESH_TOKEN_MAX_AGE
} from '@/tokens'

async function validateAccount(accountId: string, password: string) {
  const account = await prisma.account.findUnique({
    where: { accountId }
  })

  if (!account) {
    return null
  }

  const isValidPassword = await bcrypt.compare(password, account.password)

  if (!isValidPassword) {
    return null
  }

  return account
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const {
      body: { accountId, password }
    } = await req.json()

    const account = await validateAccount(accountId, password)

    if (!account) {
      return NextResponse.json({ message: ALERT_MESSAGES.LOGIN_ERROR, ok: false }, { status: 401 })
    }

    const accessToken = await generateToken({
      id: account.id,
      accountId: account.accountId,
      name: account.name,
      type: 'access'
    })

    const refreshToken = await generateToken({
      id: account.id,
      accountId: account.accountId,
      name: account.name,
      type: 'refresh'
    })

    await deleteAccountRefreshToken(account.accountId)
    await createRefreshToken(refreshToken, account.accountId)

    const response = NextResponse.json(
      { message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true },
      {
        status: 200
      }
    )

    setHttpOnlyCookie(response, 'accessToken', accessToken, ACCESS_TOKEN_MAX_AGE)
    setHttpOnlyCookie(response, 'refreshToken', refreshToken, REFRESH_TOKEN_MAX_AGE)

    return response
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
