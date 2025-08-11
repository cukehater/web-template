// app/api/me/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { verifyToken } from '@/app/(cms)/_entities/auth'

export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Access token does not exist' },
      { status: 401 },
    )
  }

  const session = await verifyToken(accessToken)

  return NextResponse.json({ user: session })
}
