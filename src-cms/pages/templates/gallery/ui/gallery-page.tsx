import { apiGet } from '@cms/shared/api'
import { PaginationType } from '@cms/shared/models'
import { Button } from '@cms/shared/shadcn'
import { PageTopTitle } from '@cms/shared/ui'
import { Gallery } from '@prisma/client'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { GalleryResponseType } from '../models/types'
import GalleryTable from './gallery-table'

export default async function GalleryPage({
  searchParams
}: {
  searchParams: { page?: string; limit?: string }
}) {
  const page = (await searchParams).page || '1'
  const limit = (await searchParams).limit || '10'

  const { data } = await apiGet<GalleryResponseType>(`/api/gallery?page=${page}&limit=${limit}`)

  return (
    <>
      <PageTopTitle description="갤러리 게시판을 관리합니다." title="갤러리 게시판">
        <Button asChild>
          <Link className="inline-flex items-center justify-center gap-2" href="./gallery/create">
            <Plus className="size-4" />
            추가하기
          </Link>
        </Button>
      </PageTopTitle>

      <GalleryTable
        currentLimit={parseInt(limit)}
        currentPage={parseInt(page)}
        initialData={data?.data as Gallery[]}
        pagination={data?.pagination as PaginationType}
      />
    </>
  )
}
