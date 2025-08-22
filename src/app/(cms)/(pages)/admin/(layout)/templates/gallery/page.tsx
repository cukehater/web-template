import { Plus } from 'lucide-react'
import Link from 'next/link'

import { GalleryTable } from '@/app/(cms)/_entities/board'
import { Button } from '@/app/(cms)/_shared/shadcn'
import { PageTopTitle } from '@/app/(cms)/_shared/ui'

export default function Page() {
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

      <GalleryTable />
    </>
  )
}
