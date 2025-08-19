import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/app/(cms)/_shared/lib'

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      // imageUrl,
      width,
      height,
      x,
      y,
      zIndex,
      startDate,
      endDate,
      isActive,
    } = await req.json()

    // 데이터 검증
    if (!title) {
      return NextResponse.json(
        { success: false, message: '필수 필드가 누락되었습니다.' },
        { status: 400 },
      )
    }

    // 날짜 검증
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : null

    if (end && start > end) {
      return NextResponse.json(
        { success: false, message: '종료일은 시작일보다 늦어야 합니다.' },
        { status: 400 },
      )
    }

    const popup = await prisma.popup.create({
      data: {
        title,
        imageUrl: 'https://picsum.photos/200/300',
        width,
        height,
        x,
        y,
        zIndex,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive,
      },
    })

    return NextResponse.json({
      success: true,
      data: popup,
      message: '팝업이 성공적으로 생성되었습니다.',
    })
  } catch (error) {
    console.error('팝업 생성 에러:', error)
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}
