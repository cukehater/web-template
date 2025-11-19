import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

import { createErrorResponse, createSuccessResponse } from '@/lib'

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponseType<string>>> {
  try {
    const accountId = req.nextUrl.searchParams.get('accountId')

    const refreshToken = await prisma.refreshToken.findFirst({
      where: { accountId: accountId as string },
      select: { token: true }
    })

    return createSuccessResponse(refreshToken?.token)
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}
