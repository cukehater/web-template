import { NextRequest, NextResponse } from 'next/server'

import { CreatePostData } from '@//app/(cms)/(pages)/admin/(layout)/settings/popup/model/types'
import { prisma } from '@/app/(cms)/_shared/lib'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreatePostData = await request.json()
    const { title, content, author, isPublished = false } = body

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: '제목, 내용, 작성자는 필수입니다.' },
        { status: 400 },
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        author,
        isPublished,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 생성에 실패했습니다.' },
      { status: 500 },
    )
  }
}
