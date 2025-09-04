import { fetchTableData } from '@cms/shared/api'
import {
  RowAmountLimitType,
  TableDataResponseType,
  TableSearchParamsType
} from '@cms/shared/models'
import { Button } from '@cms/shared/shadcn'
import { PageTopTitle } from '@cms/shared/ui'
import { General } from '@prisma/client'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import GeneralTable from './general-table'

export default async function GeneralPage({ searchParams }: TableSearchParamsType) {
  const asyncSearchParams = await searchParams
  const page = asyncSearchParams.page || '1'
  const allowedLimits = ['10', '20', '50']
  const limit = (
    allowedLimits.includes(asyncSearchParams.limit) ? asyncSearchParams.limit : '10'
  ) as RowAmountLimitType

  const { data, pagination } = (await fetchTableData<TableDataResponseType<General>>({
    table: 'general',
    page,
    limit
  })) as TableDataResponseType<General>

  return (
    <>
      <PageTopTitle description="일반 게시판을 관리합니다." title="일반 게시판">
        <Button asChild>
          <Link className="inline-flex items-center justify-center gap-2" href="./general/create">
            <Plus className="size-4" />
            게시글 생성
          </Link>
        </Button>
      </PageTopTitle>

      <GeneralTable
        currentLimit={limit}
        currentPage={page}
        initialData={data}
        pagination={pagination}
      />
    </>
  )
}
