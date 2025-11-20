import { PageTopTitle } from '@cms/shared/ui'
import { Image } from 'lucide-react'

import BannerCarousel from './banner-carousel'

export default async function BannerPage() {
  return (
    <>
      <PageTopTitle description="메인 배너를 관리합니다." icon={Image} title="메인 배너 관리" />
      <BannerCarousel />
    </>
  )
}
