import { ApiRouteReturnType } from '@cms/shared/api'
import { ALERT_MESSAGES } from '@cms/shared/lib'
import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export async function POST(req: NextRequest): Promise<NextResponse<ApiRouteReturnType<null>>> {
  try {
    const formData = await req.formData()
    const urls = new Map()

    for (const [key, value] of Array.from(formData)) {
      urls.set(key, value)

      if (!(value instanceof File)) {
        continue
      }

      const uploadDir = join(process.cwd(), 'public', 'uploads')
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      const timestamp = Date.now()
      const originalName = value.name
      const extension = originalName.split('.').pop()
      const fileName = `${originalName.split('.')[0]}_${timestamp}.${extension}`
      const filePath = join(uploadDir, fileName)

      const bytes = await value.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      const fileUrl = `/uploads/${fileName}`
      urls.set(key, fileUrl)
    }

    return NextResponse.json(
      { data: Object.fromEntries(urls), message: ALERT_MESSAGES.REQUEST_SUCCESS, ok: true },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: ALERT_MESSAGES.REQUEST_ERROR, ok: false }, { status: 500 })
  }
}
