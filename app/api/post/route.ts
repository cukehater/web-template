import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType, TableDataResponseType } from '@cms/shared/models'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// 테이블 설정 타입 정의
type TableNameType = 'gallery' | 'general'
type TableConfigType = {
  [K in TableNameType]: {
    model: PrismaClient[`${K}`]
  }
}

const TABLE_CONFIG: TableConfigType = {
  gallery: {
    model: prisma.gallery
  },
  general: {
    model: prisma.general
  }
}

// 유틸리티 함수들
const validateTable = (table: string | null): table is TableNameType => {
  return table !== null && table in TABLE_CONFIG
}

const getTableModel = (table: TableNameType) => {
  // TODO: 타입 정의
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return TABLE_CONFIG[table].model as any
}

const createErrorResponse = (message: string, status: number = 400) => {
  return NextResponse.json({ message, ok: false }, { status })
}

const createSuccessResponse = <T>(data?: T, message: string = ALERT_MESSAGES.REQUEST_SUCCESS) => {
  return NextResponse.json({
    data,
    message,
    ok: true
  })
}

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
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
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

// TODO: 삭제 후 순서 재정렬 로직 확인
// DELETE 요청 처리
export async function DELETE(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const body = await req.json()
    const table = req.nextUrl.searchParams.get('table')

    if (!validateTable(table)) {
      return createErrorResponse(ALERT_MESSAGES.NOT_SUPPORTED_TABLE, 400)
    }

    const model = getTableModel(table)
    await model.delete({ where: { id: body.id } })

    // 순서 재정렬
    await model.updateMany({
      where: { order: { gt: body.order } },
      data: { order: { decrement: 1 } }
    })

    return createSuccessResponse()
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}

async function handleOrderChange(
  // TODO: 타입 정의
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any,
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
  // TODO: 타입 정의
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any,
  body: { id: string; isVisible: boolean }
) {
  await model.update({
    where: { id: body.id },
    data: { isVisible: body.isVisible }
  })
}
