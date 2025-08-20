import { NextRequest, NextResponse } from 'next/server'

import { ALERT_MESSAGE, prisma } from '@/app/(cms)/_shared/lib'

export async function GET() {
  try {
    const basicData = await prisma.basic.findUnique({
      where: {
        id: 'basic',
      },
    })

    return NextResponse.json(basicData)
  } catch {
    return NextResponse.json(ALERT_MESSAGE.SERVER_ERROR, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    await prisma.basic.upsert({
      where: {
        id: 'basic',
      },
      update: body,
      create: {
        id: 'basic',
        ...body,
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(ALERT_MESSAGE.SERVER_ERROR, { status: 500 })
  }
}
