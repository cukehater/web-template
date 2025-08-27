import { PictureInPicture2, Plus } from 'lucide-react'

import { prisma } from '@/app/(cms)/shared/lib'
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/(cms)/shared/shadcn'
import { PageTopTitle } from '@/app/(cms)/shared/ui'

import AddPopupForm from './ui/add-popup-form'
import PopupTable from './ui/popup-table'

export default async function Page() {
  const initialData = await prisma.popup.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <Sheet>
      <PageTopTitle
        description='사이트 메인 화면에 노출되는 팝업을 관리합니다.'
        icon={PictureInPicture2}
        title='팝업 관리'
      >
        <SheetTrigger asChild>
          <Button>
            <Plus />
            추가하기
          </Button>
        </SheetTrigger>
      </PageTopTitle>
      <PopupTable initialData={initialData} />

      <SheetContent className='w-full max-h-full overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>팝업 추가</SheetTitle>
          <SheetDescription>새로운 팝업을 추가합니다.</SheetDescription>
        </SheetHeader>
        <AddPopupForm />
      </SheetContent>
    </Sheet>
  )
}
