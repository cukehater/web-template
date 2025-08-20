import { X } from 'lucide-react'
import Image from 'next/image'

import { Button } from '../shadcn'

export default function ImagePreview({
  src,
  alt,
}: {
  src: File | string
  alt: string
}) {
  if (!src) return null

  return (
    <div className='relative p-1 border border-gray-200 rounded-md inline-block self-start mt-2 bg-white'>
      <Image
        alt={alt}
        className='rounded-md'
        height={100}
        src={typeof src === 'string' ? src : URL.createObjectURL(src)}
        width={100}
      />
      <Button
        className='absolute top-[-8px] right-[-8px] z-10 p-0 size-5 rounded-full'
        size='icon'
        type='button'
        variant='outline'
        onClick={() => {
          console.log('delete!')
        }}
      >
        <X className='size-3' />
      </Button>
    </div>
  )
}
