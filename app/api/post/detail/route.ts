import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

import { createErrorResponse, createSuccessResponse, getTableModel, validateTable } from '@/lib'

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponseType<Record<string, unknown> | null>>> {
  const table = req.nextUrl.searchParams.get('table')
  const slug = req.nextUrl.searchParams.get('slug')

  if (!validateTable(table)) {
    return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TABLE, 400)
  }

  const model = getTableModel(table)
  const data = await model.findUnique({ where: { id: slug as string } })

  return createSuccessResponse(data)
}

export async function PUT(
  req: NextRequest
): Promise<NextResponse<ApiResponseType<Record<string, unknown>>>> {
  const table = req.nextUrl.searchParams.get('table')
  const slug = req.nextUrl.searchParams.get('slug')
  const body = await req.json()

  if (!validateTable(table)) {
    return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TABLE, 400)
  }

  const model = getTableModel(table)
  await model.update({
    where: { id: slug as string },
    data: body
  })

  return createSuccessResponse()
}
