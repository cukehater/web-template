import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/app/(cms)/_shared/lib'

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

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
