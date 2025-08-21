import { NextRequest, NextResponse } from 'next/server'

import { TokenVerificationError, verifyToken } from './app/(cms)/_entities/auth'

/**
 * Next.js 미들웨어 함수
 *
 * 이 미들웨어는 관리자 페이지 접근 제어와 토큰 관리를 담당합니다.
 * 주요 기능:
 * 1. 관리자 페이지 접근 시 토큰 검증
 * 2. 액세스 토큰 만료 시 리프레시 토큰을 통한 자동 갱신
 * 3. 로그인 상태에 따른 페이지 리다이렉트 처리
 *
 * @param request - Next.js 요청 객체
 * @returns NextResponse 객체
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 쿠키에서 토큰 추출
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

  // 기타 요청은 그대로 통과
  return NextResponse.next()
}

/**
 * 관리자 페이지 접근을 처리하는 함수
 *
 * @param request - Next.js 요청 객체
 * @param accessToken - 액세스 토큰
 * @param refreshToken - 리프레시 토큰
 * @returns NextResponse 객체
 */
async function handleAdminPageAccess(
  request: NextRequest,
  accessToken: string | undefined,
  refreshToken: string | undefined,
): Promise<NextResponse> {
  // 액세스 토큰이 없는 경우
  if (!accessToken) {
    console.warn('❌ 액세스 토큰 없음')
    return await handleMissingAccessToken(request, refreshToken)
  }

  // 액세스 토큰 유효성 검증
  try {
    const payload = await verifyToken(accessToken)

    // 토큰 타입 검증
    if (payload.type !== 'access') {
      console.error('Invalid token type: Expected access token')
      return await handleMissingAccessToken(request, refreshToken)
    }

    // 토큰이 유효한 경우 정상 처리
    console.warn('✅ 액세스 토큰 유효성 검증 성공')
    return NextResponse.next()
  } catch (error) {
    if (error instanceof TokenVerificationError) {
      console.error(
        `Access token verification failed: ${error.code} - ${error.message}`,
      )

      // 토큰이 만료된 경우 리프레시 토큰으로 갱신 시도
      if (error.code === 'EXPIRED') {
        return await handleMissingAccessToken(request, refreshToken)
      }
    } else {
      console.error('Access token verification failed:', error)
    }

    return await handleMissingAccessToken(request, refreshToken)
  }
}

/**
 * 액세스 토큰이 없을 때의 처리 로직
 *
 * @param request - Next.js 요청 객체
 * @param refreshToken - 리프레시 토큰
 * @returns NextResponse 객체
 */
async function handleMissingAccessToken(
  request: NextRequest,
  refreshToken: string | undefined,
): Promise<NextResponse> {
  // 리프레시 토큰이 없는 경우 로그인 페이지로 리다이렉트
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    // 리프레시 토큰 검증
    const payload = await verifyToken(refreshToken)

    // 토큰 타입 검증
    if (payload.type !== 'refresh') {
      console.error('Invalid token type: Expected refresh token')
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // 리프레시 토큰이 유효한 경우 새로운 토큰 발급
    return await issueNewTokens(request, refreshToken)
  } catch (error) {
    if (error instanceof TokenVerificationError) {
      console.error(
        `Refresh token verification failed: ${error.code} - ${error.message}`,
      )
    } else {
      console.error('Token verification failed:', error)
    }

    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

/**
 * 새로운 액세스 토큰과 리프레시 토큰을 발급하는 함수
 *
 * @param request - Next.js 요청 객체
 * @param refreshToken - 기존 리프레시 토큰
 * @returns NextResponse 객체 (새로운 토큰이 설정된 응답)
 */
async function issueNewTokens(
  request: NextRequest,
  refreshToken: string,
): Promise<NextResponse> {
  try {
    console.warn('🔁 리프레시 토큰 로테이션')

    // 토큰 로테이션을 위한 API 호출
    const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }

    // API 응답에서 쿠키를 추출하여 새로운 응답에 설정
    const newResponse = NextResponse.next()

    // Set-Cookie 헤더를 복사
    const setCookieHeaders = response.headers.getSetCookie()

    setCookieHeaders.forEach(cookie => {
      newResponse.headers.append('Set-Cookie', cookie)
    })

    return newResponse
  } catch (error) {
    console.error('Token rotation failed:', error)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

/**
 * 로그인 페이지 접근을 처리하는 함수
 *
 * 이미 로그인된 사용자가 로그인 페이지에 접근하는 경우
 * 관리자 메인 페이지로 리다이렉트합니다.
 *
 * @param request - Next.js 요청 객체
 * @param accessToken - 액세스 토큰
 * @returns NextResponse 객체
 */
function handleLoginPageAccess(
  request: NextRequest,
  accessToken: string | undefined,
): NextResponse {
  // 이미 로그인된 사용자인 경우 관리자 페이지로 리다이렉트
  if (accessToken) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // 로그인되지 않은 사용자는 로그인 페이지 접근 허용
  return NextResponse.next()
}

/**
 * 경로가 관리자 페이지인지 확인하는 유틸리티 함수
 *
 * @param pathname - 요청 경로
 * @returns 관리자 페이지 여부
 */
function isAdminPage(pathname: string): boolean {
  return pathname.startsWith('/admin')
}

/**
 * 경로가 로그인 페이지인지 확인하는 유틸리티 함수
 *
 * @param pathname - 요청 경로
 * @returns 로그인 페이지 여부
 */
function isLoginPage(pathname: string): boolean {
  return pathname.startsWith('/admin/login')
}

/**
 * 미들웨어 설정
 *
 * 관리자 페이지 경로에 대해서만 미들웨어가 실행되도록 설정
 */
export const config = {
  matcher: ['/admin/:path*'],
}
