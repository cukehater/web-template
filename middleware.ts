import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl
  // if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
  //   return NextResponse.redirect(new URL('/admin/login', request.url))
  // }
  // return NextResponse.next()
}
