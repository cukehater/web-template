'use client'

import { X } from 'lucide-react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { ALLOWED_TYPES, errorToast } from '../lib'
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
  if (typeof window === 'undefined') return null

  const input = document.querySelector(
    `input[name="${field.name}"]`,
  ) as HTMLInputElement
  const src = field.value

  if (!src) return null

  let isImage
  if (typeof src !== 'string') {
    isImage = ALLOWED_TYPES.IMAGE.includes(field.value.type)
  }

  if (!isImage) {
    input.value = ''
    console.log('asdasd')
    errorToast('이미지 파일만 업로드할 수 있습니다.')
    return
  }

  const handleDelete = () => {
    field.onChange('')

    if (input) {
      input.value = ''
    }
  }

  return (
    <div className='relative p-1 border border-gray-200 rounded-md inline-block self-start mt-2 bg-white'>
      <img
        alt={alt}
        className='rounded-md'
        height={height}
        src={typeof src === 'string' ? src : URL.createObjectURL(src)}
        width={width}
      />
      <Button
        className='absolute top-[-6px] right-[-6px] z-10 p-0.5 rounded-full'
        size={null}
        type='button'
        variant='outline'
        onClick={handleDelete}
      >
        <X className='size-2.5' />
      </Button>
    </div>
  )
}
