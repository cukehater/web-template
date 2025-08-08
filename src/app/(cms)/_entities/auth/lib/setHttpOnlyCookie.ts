import { NextResponse } from 'next/server'

export const setHttpOnlyCookie = (
  response: NextResponse,
  name: string,
  value: string,
  maxAge: number,
) => {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge,
  })
}
