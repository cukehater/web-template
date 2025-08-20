import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/app/(cms)/_shared/lib'

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    await prisma.settings.upsert({
      where: {
        id: 'settings', // 고정된 ID 사용
      },
      update: body,
      create: {
        id: 'settings', // 고정된 ID
        ...body,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Settings POST API Error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
