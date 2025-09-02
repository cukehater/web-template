import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES, setHttpOnlyCookie } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import {
  ACCESS_TOKEN_MAX_AGE,
  deleteUserRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  REFRESH_TOKEN_MAX_AGE,
  saveRefreshToken
} from '@/tokens'

async function validateUser(userId: string, password: string) {
  const user = await getUserByUserID(userId)

  if (!user) {
    return null
  }

  const isValidPassword = await verifyPassword(password, user.password)

  if (!isValidPassword) {
    return null
  }

  return user
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponseType<never>>> {
  try {
    const {
      body: { userId, password }
    } = await req.json()

    const user = await validateUser(userId, password)

    if (!user) {
      return NextResponse.json({ message: ALERT_MESSAGES.LOGIN_ERROR, ok: false }, { status: 401 })
    }

    const accessToken = await generateAccessToken({
      id: user.id,
      userId: user.userId,
      name: user.name
    })

    const refreshToken = await generateRefreshToken({
      id: user.id,
      userId: user.userId,
      name: user.name
    })

    await deleteUserRefreshToken(user.userId)
    await saveRefreshToken(refreshToken, user.userId)

    const response = NextResponse.json(
      { message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true },
      {
        status: 200
      }
    )

    setHttpOnlyCookie(response, 'accessToken', accessToken, ACCESS_TOKEN_MAX_AGE)
    setHttpOnlyCookie(response, 'refreshToken', refreshToken, REFRESH_TOKEN_MAX_AGE)

    return response
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}

const getUserByUserID = async (userId: string) => {
  return prisma.user.findUnique({
    where: { userId }
  })
}

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}
