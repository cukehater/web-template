import { X } from 'lucide-react'
import Image from 'next/image'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { Button } from '../shadcn'

export default function ImagePreview<T extends FieldValues>({
  alt,
  field,
  width = 100,
  height = 100,
}: {
  alt: string
  field: ControllerRenderProps<T, Path<T>>
  width?: number
  height?: number
}) {
  const src = field.value
  if (!src) return null

  const handleDelete = () => {
    field.onChange('')
    const input = document.querySelector(
      `input[name="${field.name}"]`,
    ) as HTMLInputElement
    if (input) {
      input.value = ''
    }
  }

  return (
    <div className='relative p-1 border border-gray-200 rounded-md inline-block self-start mt-2 bg-white'>
      <Image
        alt={alt}
        className='rounded-md'
        height={height}
        src={typeof src === 'string' ? src : URL.createObjectURL(src)}
        width={width}
      />
      <Button
        className='absolute top-[-8px] right-[-8px] z-10 p-0 size-5 rounded-full'
        size='icon'
        type='button'
        variant='outline'
        onClick={handleDelete}
      >
        <X className='size-3' />
      </Button>
    </div>
  )
}
