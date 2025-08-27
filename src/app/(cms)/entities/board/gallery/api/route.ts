import { NextRequest, NextResponse } from 'next/server'

import { ALERT_MESSAGE, prisma } from '@/app/(cms)/shared/lib'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // 전체 개수 조회
    const total = await prisma.gallery.count()

    // 페이지네이션된 데이터 조회
    const data = await prisma.gallery.findMany({
      orderBy: {
        order: 'desc',
      },
      skip,
      take: limit,
    })

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch {
    return NextResponse.json(ALERT_MESSAGE.REQUEST_ERROR, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const maxOrder = await prisma.gallery.findFirst({
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    })

    const newOrder = maxOrder ? maxOrder.order + 1 : 1

    await prisma.gallery.create({
      data: {
        ...body,
        order: newOrder,
      },
    })

    return NextResponse.json(ALERT_MESSAGE.REQUEST_SUCCESS)
  } catch {
    return NextResponse.json(ALERT_MESSAGE.REQUEST_ERROR, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const type = req.nextUrl.searchParams.get('type')

  try {
    if (type === 'order') {
      const siblingItem = await prisma.gallery.findFirst({
        where: {
          order: body.newOrder,
        },
      })

      if (siblingItem) {
        await prisma.gallery.update({
          where: { id: siblingItem.id },
          data: {
            order: body.currentOrder,
          },
        })
      }

      await prisma.gallery.update({
        where: {
          id: body.id,
        },
        data: {
          order: body.newOrder,
        },
      })

      return NextResponse.json({ data: siblingItem })
    }

    if (type === 'visible') {
      await prisma.gallery.update({
        where: { id: body.id },
        data: { isVisible: body.isVisible },
      })
      return NextResponse.json(ALERT_MESSAGE.REQUEST_SUCCESS)
    }
  } catch {
    return NextResponse.json(ALERT_MESSAGE.REQUEST_ERROR, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()

  try {
    // 삭제된 order보다 큰 모든 아이템들의 order를 1씩 감소
    await prisma.gallery.updateMany({
      where: {
        order: {
          gt: body.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    })

    // 아이템 삭제
    await prisma.gallery.delete({
      where: { id: body.id },
    })

    return NextResponse.json(ALERT_MESSAGE.REQUEST_SUCCESS)
  } catch {
    return NextResponse.json(ALERT_MESSAGE.REQUEST_ERROR, { status: 500 })
  }
}
