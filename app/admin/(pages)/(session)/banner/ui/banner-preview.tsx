'use client'

import {
  Badge,
  Button,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@cms/shared/shadcn'
import { ExternalLink, Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { uuidv4 } from 'zod'

interface Banner {
  id: string
  title: string
  description?: string | null
  imageUrl: string
  linkUrl?: string | null
  order: number
  isActive: boolean
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
}

interface BannerPreviewProps {
  banners: Banner[]
}

export default function BannerPreview({ banners }: BannerPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % banners.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, banners.length])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleBannerClick = (banner: Banner) => {
    if (banner.linkUrl) {
      window.open(banner.linkUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Card className='overflow-hidden p-0'>
      <CardContent className='p-0'>
        <div className='relative'>
          <Carousel
            className='w-full'
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {banners.map(banner => (
                <CarouselItem key={banner.id}>
                  <div
                    className='relative aspect-[16/9] cursor-pointer group'
                    onClick={() => handleBannerClick(banner)}
                  >
                    <img
                      alt={banner.title}
                      className='w-full h-full object-cover'
                      // src={banner.imageUrl}
                      src='https://english.yanadoocdn.com/upload/yanadoo/new/english/main/main_english_sectionA_pc.png'
                    />

                    {/* 배너 정보 오버레이 */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
                        <h4 className='font-semibold text-lg mb-1'>
                          {banner.title}
                        </h4>
                        {banner.description && (
                          <p className='text-sm text-gray-200 mb-2'>
                            {banner.description}
                          </p>
                        )}
                        <div className='flex items-center gap-2'>
                          <Badge className='text-xs' variant='secondary'>
                            순서: {banner.order}
                          </Badge>
                          {banner.linkUrl && (
                            <Badge className='text-xs' variant='outline'>
                              <ExternalLink className='h-3 w-3 mr-1' />
                              링크 있음
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className='left-4' />
            <CarouselNext className='right-4' />
          </Carousel>

          {/* 컨트롤 패널 */}
          <div className='absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2'>
            <Button
              className='text-white hover:bg-white/20'
              size='sm'
              variant='ghost'
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className='size-4' />
              ) : (
                <Play className='size-4' />
              )}
            </Button>

            <div className='flex gap-1'>
              {banners.map((_, index) => (
                <div
                  key={uuidv4().toString()}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 배너 정보 */}
          <div className='absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-sm'>
            {banners[currentIndex] && (
              <div>
                <span className='font-medium'>
                  {banners[currentIndex].title}
                </span>
                <span className='text-gray-300 ml-2'>
                  {currentIndex + 1} / {banners.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
