import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType, TableDataResponseType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

import {
  createErrorResponse,
  createSuccessResponse,
  getTableModel,
  PrismaModelType,
  validateTable
} from '@/lib'

// GET 요청 처리
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponseType<TableDataResponseType<Record<string, unknown>>>>> {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit
    const table = req.nextUrl.searchParams.get('table')

    if (!validateTable(table)) {
      return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TABLE, 400)
    }

    const model = getTableModel(table)
    const total = await model.count()
    const data = await model.findMany({
      orderBy: { order: 'desc' },
      skip,
      take: limit
    })

    return createSuccessResponse({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch {
    return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TABLE, 400)
  }
}

// POST 요청 처리
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const body = await req.json()
    const table = req.nextUrl.searchParams.get('table')

    if (!validateTable(table)) {
      return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TABLE, 400)
    }

    const model = getTableModel(table)
    const maxOrder = await model.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const newOrder = (maxOrder?.order ?? 0) + 1

    await model.create({
      data: { ...body, order: newOrder }
    })

    return createSuccessResponse()
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}

// PUT 요청 처리
export async function PUT(
  req: NextRequest
): Promise<NextResponse<ApiResponseType<Record<string, unknown>>>> {
  try {
    const body = await req.json()
    const type = req.nextUrl.searchParams.get('type')
    const table = req.nextUrl.searchParams.get('table')

    if (!validateTable(table)) {
      return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TABLE, 400)
    }

    if (!type) {
      return createErrorResponse(ALERT_MESSAGES.TYPE_PARAMETER_REQUIRED, 400)
    }

    const model = getTableModel(table)

    switch (type) {
      case 'order':
        await handleOrderChange(model, body)
        break
      case 'visible':
        await handleVisibleChange(model, body)
        break
      default:
        return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TYPE, 400)
    }

    return createSuccessResponse()
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}

// DELETE 요청 처리
export async function DELETE(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const body = await req.json()
    const table = req.nextUrl.searchParams.get('table')

    if (!validateTable(table)) {
      return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TABLE, 400)
    }

    const model = getTableModel(table)

    // 순서 재정렬
    await model.updateMany({
      where: { order: { gt: body.order } },
      data: { order: { decrement: 1 } }
    })

    await model.delete({ where: { id: body.id } })
    return createSuccessResponse()
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}

async function handleOrderChange(
  model: PrismaModelType,
  body: { id: string; currentOrder: number; newOrder: number }
) {
  const siblingData = await model.findFirst({
    where: { order: body.newOrder }
  })

  if (siblingData) {
    await model.update({
      where: { id: siblingData.id },
      data: { order: body.currentOrder }
    })
  }

  await model.update({
    where: { id: body.id },
    data: { order: body.newOrder }
  })
}

async function handleVisibleChange(
  model: PrismaModelType,
  body: { id: string; isVisible: boolean }
) {
  await model.update({
    where: { id: body.id },
    data: { isVisible: body.isVisible }
  })
}
