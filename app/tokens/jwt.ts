import { apiDelete, apiGet, apiPost } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { jwtVerify, SignJWT } from 'jose'

import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from './token-expiry'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

interface TokenPayloadType {
  id: string
  accountId: string
  type: 'access' | 'refresh'
  name: string
  exp?: number
  iat?: number
}

// 엑세스/리프레시 토큰 생성
export const generateToken = async (payload: TokenPayloadType): Promise<string> => {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.type === 'access' ? ACCESS_TOKEN_EXPIRY : REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET)
}

// DB에서 accountId의 모든 리프레시 토큰 삭제
export const deleteAccountRefreshToken = async (accountId: string): Promise<void> => {
  await apiDelete('/api/auth/token/delete', { accountId })
}

// DB에 리프레시 토큰 저장
export const createRefreshToken = async (token: string, accountId: string): Promise<void> => {
  await apiPost('/api/auth/token/create', { token, accountId })
}

// 토큰 검증
export const verifyToken = async (token: string): Promise<TokenPayloadType> => {
  const { payload }: { payload: TokenPayloadType } = await jwtVerify(token, JWT_SECRET)

  if (!payload || Object.keys(payload).length === 0) {
    throw new Error(ALERT_MESSAGES.TOKEN_VERIFICATION_FAILED)
  }

  return payload
}

// DB에서 accountId의 리프레시 토큰 조회
export const getRefreshToken = async (accountId: string) => {
  const { data: refreshToken } = await apiGet(`/api/auth/token/get?accountId=${accountId}`)
  return refreshToken
}

// 리프레시 토큰 로테이션 생성
export const rotateRefreshToken = async (
  currentRefreshToken: string
): Promise<{ newAccessToken: string; newRefreshToken: string }> => {
  try {
    const payload = await verifyToken(currentRefreshToken)

    const newAccessToken = await generateToken({
      id: payload.id,
      accountId: payload.accountId,
      name: payload.name,
      type: 'access'
    })

    const newRefreshToken = await generateToken({
      id: payload.id,
      accountId: payload.accountId,
      name: payload.name,
      type: 'refresh'
    })

    await createRefreshToken(newRefreshToken, payload.accountId)

    return { newAccessToken, newRefreshToken }
  } catch {
    throw new Error(ALERT_MESSAGES.REFRESH_TOKEN_ROTATION_FAILED)
  }
}
