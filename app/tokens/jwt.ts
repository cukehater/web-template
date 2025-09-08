import { prisma } from '@cms/shared/api'
import { jwtVerify, SignJWT } from 'jose'
import { JWTExpired, JWTInvalid } from 'jose/errors'

import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_MAX_AGE } from './token-expiry'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export interface TokenPayloadType {
  id: string
  accountId: string
  name: string
  exp?: number
  iat?: number
}

// 커스텀 토큰 검증 오류 클래스
export class TokenVerificationError extends Error {
  constructor(
    message: string,
    public readonly code: 'EXPIRED' | 'INVALID' | 'UNKNOWN'
  ) {
    super(message)
    this.name = 'TokenVerificationError'
  }
}

// 액세스 토큰 생성
export const generateAccessToken = async (payload: TokenPayloadType): Promise<string> => {
  return await new SignJWT({ ...payload, type: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET)
}

// 리프레시 토큰 생성
export const generateRefreshToken = async (payload: TokenPayloadType): Promise<string> => {
  return await new SignJWT({ ...payload, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET)
}

// 데이터베이스에 리프레시 토큰 저장
export const saveRefreshToken = async (token: string, accountId: string): Promise<void> => {
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE * 1000)

  await prisma.refreshToken.create({
    data: {
      token,
      accountId,
      expiresAt
    }
  })
}

// 사용자의 모든 리프레시 토큰 삭제
export const deleteAccountRefreshToken = async (accountId: string): Promise<void> => {
  await prisma.refreshToken.deleteMany({
    where: { accountId }
  })
}

// 토큰 검증
export const verifyToken = async (token: string): Promise<TokenPayloadType & { type: string }> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as TokenPayloadType & { type: string }
  } catch (error) {
    if (error instanceof JWTExpired) {
      throw new TokenVerificationError('Token has expired', 'EXPIRED')
    } else if (error instanceof JWTInvalid) {
      throw new TokenVerificationError('Token is invalid', 'INVALID')
    } else {
      throw new TokenVerificationError('Token verification failed', 'UNKNOWN')
    }
  }
}

export const getRefreshTokenFromDB = async (accountId: string): Promise<string | null> => {
  const refreshToken = await prisma.refreshToken.findFirst({
    where: { accountId }
  })
  return refreshToken?.token || null
}

// 리프레시 토큰 로테이션
export const rotateRefreshToken = async (
  currentRefreshToken: string
): Promise<{ newAccessToken: string; newRefreshToken: string }> => {
  try {
    const payload = await verifyToken(currentRefreshToken)

    const newAccessToken = await generateAccessToken({
      id: payload.id,
      accountId: payload.accountId,
      name: payload.name
    })

    const newRefreshToken = await generateRefreshToken({
      id: payload.id,
      accountId: payload.accountId,
      name: payload.name
    })

    await deleteAccountRefreshToken(payload.accountId)
    await saveRefreshToken(newRefreshToken, payload.accountId)

    return { newAccessToken, newRefreshToken }
  } catch (error) {
    if (error instanceof TokenVerificationError) {
      throw new Error(`Token rotation failed: ${error.message}`)
    }
    throw new Error('Token rotation failed')
  }
}
