import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@cms/shared/ui/shadcn'
import * as React from 'react'
import { v4 as uuid } from 'uuid'

export default function BannerCarousel() {
  return (
    <div className="border-1 border-gray-200 rounded-lg overflow-hidden relative">
      <Carousel
        className="w-full max-w-md mx-auto static"
        opts={{ align: 'center', loop: true }}
        orientation="vertical"
      >
        <CarouselContent className="h-[350px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={uuid()} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card className="aspect-16/9">
                  <CardContent className="flex items-center justify-center h-full">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="rotate-0 left-[5%] right-auto top-1/2 -translate-y-1/2 translate-x-0" />
        <CarouselNext className="rotate-0 left-auto right-[5%] top-1/2 -translate-y-1/2 translate-x-0" />
      </Carousel>
    </div>
  )
}
