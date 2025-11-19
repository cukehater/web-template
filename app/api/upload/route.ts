import { ALERT_MESSAGES } from '@cms/shared/lib'
import { ApiResponseType, UploadResponseType } from '@cms/shared/models'
import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

import { createErrorResponse, createSuccessResponse } from '@/lib'

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponseType<UploadResponseType>>> {
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

      const originalName = value.name
      const extension = originalName.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${extension}`
      const filePath = join(uploadDir, fileName)

      const bytes = await value.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      const fileUrl = `/uploads/${fileName}`
      urls.set(key, fileUrl)
    }

    return createSuccessResponse(Object.fromEntries(urls))
  } catch {
    return createErrorResponse(ALERT_MESSAGES.REQUEST_ERROR, 500)
  }
}
