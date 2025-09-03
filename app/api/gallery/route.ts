import { PaginationType } from '@cms/features/pagination'
import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { Gallery } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<
  NextResponse<
    ApiResponseType<{
      data: Gallery[]
      pagination: PaginationType
    }>
  >
> {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const total = await prisma.gallery.count()
    const data = await prisma.gallery.findMany({
      orderBy: {
        order: 'desc'
      },
      skip,
      take: limit
    })

    return NextResponse.json({
      data: {
        data: data as Gallery[],
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      },
      message: ALERT_MESSAGES.REQUEST_SUCCESS,
      ok: true
    })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  const body = await req.json()

  try {
    const maxOrder = await prisma.gallery.findFirst({
      orderBy: {
        order: 'desc'
      },
      select: {
        order: true
      }
    })

    const newOrder = maxOrder ? maxOrder.order + 1 : 1

    await prisma.gallery.create({
      data: {
        ...body,
        order: newOrder
      }
    })

    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse<ApiResponseType<Gallery>>> {
  const body = await req.json()
  const type = req.nextUrl.searchParams.get('type')

  try {
    if (!type) {
      return NextResponse.json(
        { message: ALERT_MESSAGES.TYPE_PARAMETER_REQUIRED, ok: false },
        { status: 400 }
      )
    }

    let data: Gallery | null = null

    switch (type) {
      case 'order':
        data = await prisma.gallery.findFirst({
          where: {
            order: body.newOrder
          }
        })

        if (data) {
          await prisma.gallery.update({
            where: { id: data.id },
            data: {
              order: body.currentOrder
            }
          })
        }

        await prisma.gallery.update({
          where: {
            id: body.id
          },
          data: {
            order: body.newOrder
          }
        })
        break
      case 'visible':
        await prisma.gallery.update({
          where: { id: body.id },
          data: { isVisible: body.isVisible }
        })
        break
    }

    return NextResponse.json({
      data: data as Gallery,
      message: ALERT_MESSAGES.REQUEST_SUCCESS,
      ok: true
    })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  const body = await req.json()

  try {
    // 삭제된 order보다 큰 모든 아이템들의 order를 1씩 감소
    await prisma.gallery.updateMany({
      where: {
        order: {
          gt: body.order
        }
      },
      data: {
        order: {
          decrement: 1
        }
      }
    })

    // 아이템 삭제
    await prisma.gallery.delete({
      where: { id: body.id }
    })

    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true })
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
