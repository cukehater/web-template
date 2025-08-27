import { Plus } from 'lucide-react'
import Link from 'next/link'

import { GeneralTable } from '@/app/(cms)/entities/board/general'
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/board/general?page=${page}&limit=${limit}`,
  ).then(res => res.json())

  return (
    <>
      <PageTopTitle description='일반 게시판을 관리합니다.' title='일반 게시판'>
        <Button asChild>
          <Link
            className='inline-flex items-center justify-center gap-2'
            href='./general/create'
          >
            <Plus className='size-4' />
            추가하기
          </Link>
        </Button>
      </PageTopTitle>
      <GeneralTable
        currentLimit={parseInt(limit)}
        currentPage={parseInt(page)}
        initialData={data}
        pagination={pagination}
      />
    </>
  )
}
