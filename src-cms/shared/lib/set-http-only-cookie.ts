import { NextResponse } from 'next/server'

export const setHttpOnlyCookie = (
  response: NextResponse,
  name: string,
  value: string,
  maxAge: number
) => {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge,
    path: '/'
  })
}

export const resetHttpOnlyCookie = (response: NextResponse) => {
  setHttpOnlyCookie(response, 'accessToken', '', 0)
  setHttpOnlyCookie(response, 'refreshToken', '', 0)
}
