import { ApiRouteReturnType, prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { BasicFormSchemaType } from '@cms/shared/models'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<ApiRouteReturnType<BasicFormSchemaType>>> {
  try {
    const basicData = await prisma.basic.findUnique({
      where: {
        id: 'basic'
      }
    })

    return NextResponse.json(
      {
        data: basicData as BasicFormSchemaType,
        message: ALERT_MESSAGES.REQUEST_SUCCESS,
        ok: true
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiRouteReturnType<null>>> {
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

    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
