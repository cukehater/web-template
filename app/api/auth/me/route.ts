import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { Account } from '@prisma/client'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createErrorResponse, createSuccessResponse } from '@/lib'
import { verifyToken } from '@/tokens'

export const GET = async (): Promise<
  NextResponse<ApiResponseType<Pick<Account, 'name' | 'accountId'>>>
> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value as string

    const payload = await verifyToken(accessToken)

    const account = (await prisma.account.findUnique({
      where: { accountId: payload.accountId },
      select: {
        name: true,
        accountId: true
      }
    })) as Pick<Account, 'name' | 'accountId'>

    return createSuccessResponse(account)
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}
