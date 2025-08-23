import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

import { ALERT_MESSAGE } from '@/app/(cms)/_shared/lib'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const urls = new Map()

    for (const [key, value] of Array.from(formData)) {
      urls.set(key, value)

      if (!(value instanceof File)) {
        continue
      }

      // 업로드 디렉토리 생성
      const uploadDir = join(process.cwd(), 'public', 'uploads')
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      // 파일명 생성 (타임스탬프 + 원본명)
      const timestamp = Date.now()
      const originalName = value.name
      const extension = originalName.split('.').pop()
      const fileName = `${originalName.split('.')[0]}_${timestamp}.${extension}`
      const filePath = join(uploadDir, fileName)

      // 파일 저장
      const bytes = await value.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      // 파일 URL 반환
      const fileUrl = `/uploads/${fileName}`
      urls.set(key, fileUrl)
    }

    return NextResponse.json(Object.fromEntries(urls))
  } catch {
    return NextResponse.json(ALERT_MESSAGE.REQUEST_ERROR, { status: 500 })
  }
}
