import { prisma } from '@cms/shared/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json(banners)
  } catch (error) {
    console.error('배너 조회 오류:', error)
    return NextResponse.json(
      { error: '배너 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      imageUrl,
      linkUrl,
      order,
      isActive,
      startDate,
      endDate,
    } = body

    const banner = await prisma.banner.create({
      data: {
        title,
        description,
        imageUrl,
        linkUrl,
        order: order || 0,
        isActive: isActive ?? true,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    })

    return NextResponse.json(banner)
  } catch (error) {
    console.error('배너 생성 오류:', error)
    return NextResponse.json(
      { error: '배너 생성 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
