import { jwtVerify, SignJWT } from 'jose'
import { JWTExpired, JWTInvalid } from 'jose/errors'

import { prisma } from '../../db/model/prisma'
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../model/constants'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export interface TokenPayload {
  userId: string
  name: string
  exp?: number
  iat?: number
}

// 커스텀 토큰 검증 오류 클래스
export class TokenVerificationError extends Error {
  constructor(
    message: string,
    public readonly code: 'EXPIRED' | 'INVALID' | 'UNKNOWN',
  ) {
    super(message)
    this.name = 'TokenVerificationError'
  }
}

// 액세스 토큰 생성
export const generateAccessToken = async (
  payload: TokenPayload,
): Promise<string> => {
  return await new SignJWT({ ...payload, type: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET)
}

// 리프레시 토큰 생성
export const generateRefreshToken = async (
  payload: TokenPayload,
): Promise<string> => {
  return await new SignJWT({ ...payload, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET)
}

// 데이터베이스에 리프레시 토큰 저장
export const saveRefreshToken = async (
  token: string,
  userId: string,
): Promise<void> => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7일

  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  })
}

// 사용자의 모든 리프레시 토큰 삭제
export const deleteUserRefreshTokens = async (
  userId: string,
): Promise<void> => {
  await prisma.refreshToken.deleteMany({
    where: { userId },
  })
}

// 리프레시 토큰 삭제
export const deleteRefreshToken = async (token: string): Promise<void> => {
  await prisma.refreshToken.deleteMany({
    where: { token },
  })
}

// 토큰 검증 (개선된 버전)
export const verifyToken = async (
  token: string,
): Promise<TokenPayload & { type: string }> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as TokenPayload & { type: string }
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

// 엑세스 토큰 만료 시간 조회
export const getTokenExpiry = async (currentToken: string): Promise<number> => {
  try {
    const { exp } = await verifyToken(currentToken)
    return new Date((exp || 0) * 1000).getTime()
  } catch (error) {
    if (error instanceof TokenVerificationError && error.code === 'EXPIRED') {
      return 0 // 만료된 토큰은 0 반환
    }
    throw error
  }
}

// 리프레시 토큰 로테이션
export const rotateRefreshToken = async (
  currentRefreshToken: string,
): Promise<{ newAccessToken: string; newRefreshToken: string }> => {
  try {
    const payload = await verifyToken(currentRefreshToken)

    // 새로운 토큰 생성
    const newAccessToken = await generateAccessToken({
      userId: payload.userId,
      name: payload.name,
    })

    const newRefreshToken = await generateRefreshToken({
      userId: payload.userId,
      name: payload.name,
    })

    // await deleteRefreshToken(currentRefreshToken)
    // await saveRefreshToken(newRefreshToken, payload.userId)

    return { newAccessToken, newRefreshToken }
  } catch (error) {
    if (error instanceof TokenVerificationError) {
      throw new Error(`Token rotation failed: ${error.message}`)
    }
    throw new Error('Token rotation failed')
  }
}
