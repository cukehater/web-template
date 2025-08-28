import { prisma } from '@cms/shared/lib'
import {
  Badge,
  Button,
  Card,
  CardContent,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@cms/shared/shadcn'
import { PageTopTitle } from '@cms/shared/ui'
import { Image, Plus, Settings } from 'lucide-react'

import BannerForm from './ui/banner-form'
import BannerPreview from './ui/banner-preview'
import BannerTable from './ui/banner-table'

export default async function Page() {
  const initialData = await prisma.banner.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  const activeBanners = initialData.filter(banner => banner.isActive)
  const inactiveBanners = initialData.filter(banner => !banner.isActive)

  return (
    <div className='space-y-6'>
      <PageTopTitle
        description='사이트 메인 화면에 노출되는 배너를 관리합니다.'
        icon={Image}
        title='메인 배너 관리'
      >
        <div className='flex gap-2'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='sm' variant='outline'>
                <Settings className='size-4 mr-2' />
                설정
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>배너 설정</SheetTitle>
                <SheetDescription>
                  배너 표시 관련 설정을 관리합니다.
                </SheetDescription>
              </SheetHeader>
              <div className='space-y-4 mt-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium'>자동 슬라이드</h4>
                    <p className='text-sm text-muted-foreground'>
                      배너가 자동으로 슬라이드됩니다
                    </p>
                  </div>
                  <Badge variant='secondary'>기본값: 5초</Badge>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium'>표시 개수</h4>
                    <p className='text-sm text-muted-foreground'>
                      한 번에 표시할 배너 개수
                    </p>
                  </div>
                  <Badge variant='secondary'>기본값: 1개</Badge>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className='size-4 mr-2' />
                배너 추가
              </Button>
            </SheetTrigger>
            <SheetContent className='w-full max-h-full overflow-y-auto'>
              <SheetHeader>
                <SheetTitle>배너 추가</SheetTitle>
                <SheetDescription>새로운 배너를 추가합니다.</SheetDescription>
              </SheetHeader>
              <BannerForm />
            </SheetContent>
          </Sheet>
        </div>
      </PageTopTitle>

      {/* 배너 미리보기 섹션 */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>배너 미리보기</h3>
          <div className='flex gap-2'>
            <Badge variant='outline'>활성: {activeBanners.length}개</Badge>
            <Badge variant='outline'>비활성: {inactiveBanners.length}개</Badge>
          </div>
        </div>

        {activeBanners.length > 0 ? (
          <BannerPreview banners={activeBanners} />
        ) : (
          <Card className='p-8'>
            <CardContent className='flex flex-col items-center justify-center text-center'>
              <Image className='h-12 w-12 text-muted-foreground mb-4' />
              <h4 className='font-medium mb-2'>활성 배너가 없습니다</h4>
              <p className='text-sm text-muted-foreground mb-4'>
                새로운 배너를 추가하거나 기존 배너를 활성화해주세요.
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size='sm'>
                    <Plus className='size-4 mr-2' />
                    배너 추가
                  </Button>
                </SheetTrigger>
                <SheetContent className='w-full max-h-full overflow-y-auto'>
                  <SheetHeader>
                    <SheetTitle>배너 추가</SheetTitle>
                    <SheetDescription>
                      새로운 배너를 추가합니다.
                    </SheetDescription>
                  </SheetHeader>
                  <BannerForm />
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 배너 관리 테이블 */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>배너 관리</h3>
        <BannerTable initialData={initialData} />
      </div>
    </div>
  )
}
