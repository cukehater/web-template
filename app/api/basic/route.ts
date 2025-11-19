import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { Basic } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { createErrorResponse, createSuccessResponse } from '@/lib'

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponseType<Basic>>> {
  try {
    const { searchParams } = new URL(req.url)
    const searchParamsKeys = Array.from(searchParams.keys())

    let select = undefined

    if (searchParamsKeys.length > 0) {
      select = {} as Record<string, boolean>
      for (const key of searchParamsKeys) {
        select[key] = true
      }
    }

    const basicData = await prisma.basic.findUnique({
      where: {
        id: 'basic'
      },
      select
    })

    return createSuccessResponse(basicData as Basic)
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  const { body } = await req.json()

  try {
    await prisma.basic.upsert({
      where: {
        id: 'basic'
      },
      update: body,
      create: {
        id: 'basic',
        ...body
      }
    })

    return createSuccessResponse()
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}
