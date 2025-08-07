import { jwtVerify, SignJWT } from 'jose'

import { prisma } from '../../db/model/prisma'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'jwt-secret-key',
)

const ACCESS_TOKEN_EXPIRY = '5s'
const REFRESH_TOKEN_EXPIRY = '7d'

export interface TokenPayload {
  userId: string
  name: string
  exp?: number
  iat?: number
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

// 토큰 검증
export const verifyToken = async (
  token: string,
): Promise<TokenPayload & { type: string }> => {
  const { payload } = await jwtVerify(token, JWT_SECRET)
  return payload as unknown as TokenPayload & { type: string }
}

// 엑세스 토큰 만료 시간 조회
export const getTokenExpiry = async (currentToken: string): Promise<number> => {
  const { exp } = await verifyToken(currentToken)

  return new Date((exp || 0) * 1000).getTime()
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

    // 기존 리프레시 토큰 삭제 & 새 리프레시 토큰 저장
    // await deleteRefreshToken(currentRefreshToken)
    // console.log('deleter refresh token success')
    // await saveRefreshToken(newRefreshToken, payload.userId)
    // console.log('save refresh token success')

    return { newAccessToken, newRefreshToken }
  } catch {
    throw new Error('Token rotation failed')
  }
}

// const main = async () => {
//   const accessToken = await generateAccessToken({
//     userId: '1',
//     name: 'John Doe',
//   })

//   console.log(await verifyToken(accessToken))
// }

// main()
