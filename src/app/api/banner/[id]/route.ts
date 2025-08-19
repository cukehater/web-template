import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/app/(cms)/_shared/lib'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, linkUrl, order, isActive, startDate, endDate } = body

    const banner = await prisma.banner.update({
      where: { id: params.id },
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
    console.error('배너 수정 오류:', error)
    return NextResponse.json(
      { error: '배너 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.banner.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: '배너가 삭제되었습니다.' })
  } catch (error) {
    console.error('배너 삭제 오류:', error)
    return NextResponse.json(
      { error: '배너 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
