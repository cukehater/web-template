import { verifyToken } from '@cms/entities/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Access token does not exist' },
      { status: 401 },
    )
  }
  const payload = await verifyToken(accessToken as string)

  if (payload.type !== 'access') {
    return NextResponse.json({ error: 'Invalid access token' }, { status: 401 })
  }

  const session = await verifyToken(accessToken)

  return NextResponse.json({ userId: session.userId, name: session.name })
}
