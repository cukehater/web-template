import { ALERT_MESSAGES } from '@cms/shared/lib'
import { NextResponse } from 'next/server'

export const createSuccessResponse = <T>(data?: T, message = ALERT_MESSAGES.REQUEST_SUCCESS) => {
  return NextResponse.json({
    data,
    message,
    ok: true
  })
}

export const createErrorResponse = (message: string, status = 400) => {
  return NextResponse.json({ message, ok: false }, { status })
}
