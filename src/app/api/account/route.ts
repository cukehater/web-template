import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import { ALERT_MESSAGE, prisma } from '@/app/(cms)/_shared/lib'

export const PATCH = async (req: NextRequest) => {
  const payload = await req.json()

  try {
    await prisma.user.update({
      where: { id: payload.id },
      data: {
        name: payload.name,
        password: await bcrypt.hash(payload.newPassword, 10),
      },
    })

    return NextResponse.json(ALERT_MESSAGE.REQUEST_SUCCESS)
  } catch {
    return NextResponse.json(ALERT_MESSAGE.REQUEST_ERROR, { status: 500 })
  }
}
