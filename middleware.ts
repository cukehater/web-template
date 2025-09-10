import { ALERT_MESSAGES, resetHttpOnlyCookie } from '@cms/shared/lib'
import { NextRequest, NextResponse } from 'next/server'

import { verifyToken } from '@/tokens'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // 관리자 페이지 접근 처리 (로그인 페이지 제외)
  if (isAdminPage(pathname) && !isLoginPage(pathname)) {
    return await handleAdminPageAccess(request, accessToken, refreshToken)
  }

  // 로그인 페이지 접근 처리
  if (isLoginPage(pathname)) {
    return handleLoginPageAccess(request, accessToken)
  }

  return NextResponse.next()
}

async function handleAdminPageAccess(
  request: NextRequest,
  accessToken: string | undefined,
  refreshToken: string | undefined
): Promise<NextResponse> {
  // 액세스 토큰이 없는 경우
  if (!accessToken) {
    console.warn(ALERT_MESSAGES.ACCESS_TOKEN_MISSING)
    return await handleMissingAccessToken(request, refreshToken)
  }

  // 액세스 토큰 유효성 검증
  try {
    const payload = await verifyToken(accessToken)
    if (payload.type !== 'access') {
      return await handleMissingAccessToken(request, refreshToken)
    }
    return NextResponse.next()
  } catch {
    return await handleMissingAccessToken(request, refreshToken)
  }
}

// 액세스 토큰이 없을 때의 처리 로직
async function handleMissingAccessToken(
  request: NextRequest,
  refreshToken: string | undefined
): Promise<NextResponse> {
  try {
    if (!refreshToken) {
      throw new Error(ALERT_MESSAGES.REFRESH_TOKEN_MISSING)
    }

    const payload = await verifyToken(refreshToken)

    if (payload.type !== 'refresh') {
      throw new Error(ALERT_MESSAGES.REFRESH_TOKEN_TYPE_ERROR)
    }

    return await issueNewTokens(request, refreshToken)
  } catch {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

// 새로운 엑세스 토큰과 리프레시 토큰 발급
async function issueNewTokens(request: NextRequest, refreshToken: string): Promise<NextResponse> {
  try {
    console.warn(ALERT_MESSAGES.REFRESH_TOKEN_ROTATION_STARTED)

    const response = await fetch(`${request.nextUrl.origin}/api/auth/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    })

    if (!response.ok) {
      const result = await response.json()
      console.warn(result.message)

      const errorResponse = NextResponse.next()

      resetHttpOnlyCookie(errorResponse)

      return errorResponse
    }

    const setCookieHeaders = response.headers.getSetCookie()

    const newResponse = NextResponse.next()
    setCookieHeaders.forEach((cookie) => {
      newResponse.headers.append('Set-Cookie', cookie)
    })

    console.warn(ALERT_MESSAGES.REFRESH_TOKEN_ROTATION_SUCCESS)

    return newResponse
  } catch {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

async function handleLoginPageAccess(
  request: NextRequest,
  accessToken: string | undefined
): Promise<NextResponse> {
  if (accessToken) {
    const payload = await verifyToken(accessToken)
    if (payload.type === 'access') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

function isAdminPage(pathname: string): boolean {
  return pathname.startsWith('/admin')
}

function isLoginPage(pathname: string): boolean {
  return pathname.startsWith('/admin/login')
}

export const config = {
  matcher: ['/admin/:path*']
}
