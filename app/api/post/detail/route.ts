import { prisma } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType } from '@cms/shared/models'
import { Gallery } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponseType<Gallery>>> {
  const slug = req.nextUrl.searchParams.get('slug')

  const data = await prisma.gallery.findUnique({ where: { id: slug as string } })

  return NextResponse.json(
    {
      data: data as Gallery,
      message: ALERT_MESSAGES.REQUEST_SUCCESS,
      ok: true
    },
    { status: 200 }
  )
}

export async function PUT(req: NextRequest): Promise<NextResponse<ApiResponseType<Gallery>>> {
  const slug = req.nextUrl.searchParams.get('slug')
  const body = await req.json()

  const data = await prisma.gallery.update({
    where: { id: slug as string },
    data: body
  })

  return NextResponse.json(
    {
      data: data as Gallery,
      message: ALERT_MESSAGES.REQUEST_SUCCESS,
      ok: true
    },
    { status: 200 }
  )
}
