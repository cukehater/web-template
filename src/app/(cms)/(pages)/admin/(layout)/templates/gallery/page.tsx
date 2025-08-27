import { Plus } from 'lucide-react'
import Link from 'next/link'

import { GalleryTable } from '@/app/(cms)/entities/board/gallery'
import { Button } from '@/app/(cms)/shared/shadcn'
import { PageTopTitle } from '@/app/(cms)/shared/ui'

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string }
}) {
  const page = (await searchParams).page || '1'
  const limit = (await searchParams).limit || '10'

  const { data, pagination } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/board/gallery?page=${page}&limit=${limit}`,
  ).then(res => res.json())

  return (
    <>
      <PageTopTitle
        description='갤러리 게시판을 관리합니다.'
        title='갤러리 게시판'
      >
        <Button asChild>
          <Link
            className='inline-flex items-center justify-center gap-2'
            href='./gallery/create'
          >
            <Plus className='size-4' />
            추가하기
          </Link>
        </Button>
      </PageTopTitle>

      <GalleryTable
        currentLimit={parseInt(limit)}
        currentPage={parseInt(page)}
        initialData={data}
        pagination={pagination}
      />
    </>
  )
}
