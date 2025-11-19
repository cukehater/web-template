import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

import { createErrorResponse, createSuccessResponse } from '@/lib'

export async function DELETE(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const { accountId } = await req.json()

    await prisma.refreshToken.deleteMany({
      where: { accountId }
    })

    return createSuccessResponse()
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}
