import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { AccountType, ApiResponseType } from '@cms/shared/models'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import { createErrorResponse, createSuccessResponse } from '@/lib'

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

    return createSuccessResponse(data as AccountType[])
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}

export const PATCH = async (req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> => {
  try {
    const type = req.nextUrl.searchParams.get('type')
    const body = await req.json()

    if (!type) {
      return createErrorResponse(ALERT_MESSAGES.TYPE_PARAMETER_REQUIRED, 400)
    }

    switch (type) {
      case 'password':
        return await handlePasswordUpdate(body)
      case 'name':
        return await handleNameUpdate(body)
      default:
        return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TYPE, 400)
    }
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}

async function handlePasswordUpdate(body: {
  id: string
  password: string
  newPassword: string
}): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const account = await prisma.account.findUnique({
      where: { id: body.id }
    })

    if (!account) {
      return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 404)
    }

    const isPasswordMatch = await bcrypt.compare(body.password, account.password)

    if (!isPasswordMatch) {
      return createErrorResponse(ALERT_MESSAGES.PASSWORD_NOT_MATCH_CURRENT, 400)
    }

    await prisma.account.update({
      where: { id: body.id },
      data: {
        password: await bcrypt.hash(body.newPassword, 10)
      }
    })

    return createSuccessResponse()
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}

async function handleNameUpdate(body: {
  id: string
  name: string
}): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    await prisma.account.update({
      where: { id: body.id },
      data: { name: body.name }
    })

    return createSuccessResponse()
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}
