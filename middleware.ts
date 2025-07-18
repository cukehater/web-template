import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // 로그인 페이지에 이미 로그인된 사용자가 접근하는 경우
  if (pathname.startsWith('/admin/login')) {
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  // 관리자 페이지에 로그인하지 않은 사용자가 접근하는 경우
  if (pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // 관리자 권한이 필요한 페이지 체크
  if (pathname.startsWith('/admin') && session?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
