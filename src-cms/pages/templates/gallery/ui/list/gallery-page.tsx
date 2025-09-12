import { fetchTableData } from '@cms/shared/api'
import {
  RowAmountLimitType,
  TableDataResponseType,
  TableSearchParamsType
} from '@cms/shared/models'
import { PageTopTitle } from '@cms/shared/ui'
import { Button } from '@cms/shared/ui/shadcn'
import { Gallery } from '@prisma/client'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import GalleryTable from './gallery-table'

export default async function GalleryPage({ searchParams }: TableSearchParamsType) {
  const asyncSearchParams = await searchParams
  const page = asyncSearchParams.page || '1'
  const allowedLimits = ['10', '20', '50']
  const limit = (
    allowedLimits.includes(asyncSearchParams.limit) ? asyncSearchParams.limit : '10'
  ) as RowAmountLimitType

  const { data, pagination } = (await fetchTableData<TableDataResponseType<Gallery>>({
    table: 'gallery',
    page,
    limit
  })) as TableDataResponseType<Gallery>

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
        currentLimit={limit}
        currentPage={page}
        initialData={data}
        pagination={pagination}
      />
    </>
  )
}
