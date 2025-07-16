import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UpdatePostData } from '@/app/(cms)/(pages)/admin/(layout)/settings/popup/model/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 },
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: 500 },
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body: UpdatePostData = await request.json()

    const post = await prisma.post.update({
      where: { id: params.id },
      data: body,
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 수정에 실패했습니다.' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: '게시글이 삭제되었습니다.' })
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 삭제에 실패했습니다.' },
      { status: 500 },
    )
  }
}
