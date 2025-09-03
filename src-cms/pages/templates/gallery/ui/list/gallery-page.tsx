import { Button } from '@cms/shared/shadcn'
import { PageTopTitle } from '@cms/shared/ui'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { fetchGalleryList } from '../../api/fetch-gallery-list'
import GalleryTable from './gallery-table'

interface GalleryPagePropsType {
  searchParams: {
    page: string
    limit: string
  }
}

export default async function GalleryPage({ searchParams }: GalleryPagePropsType) {
  const page = (await searchParams).page || '1'
  const limit = (await searchParams).limit
  const allowedLimits = ['10', '20', '50']
  const currentLimit = allowedLimits.includes(limit) ? limit : '10'

  const { data, pagination } = await fetchGalleryList(parseInt(page), parseInt(currentLimit))

  return (
    <>
      <PageTopTitle description="갤러리 게시판을 관리합니다." title="갤러리 게시판">
        <Button asChild>
          <Link className="inline-flex items-center justify-center gap-2" href="./gallery/create">
            <Plus className="size-4" />
            게시글 생성
          </Link>
        </Button>
      </PageTopTitle>

      <GalleryTable
        currentLimit={parseInt(currentLimit) as 10 | 20 | 50}
        currentPage={parseInt(page)}
        initialData={data}
        pagination={pagination}
      />
    </>
  )
}
