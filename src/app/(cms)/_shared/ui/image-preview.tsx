'use client'

import { X } from 'lucide-react'
import { useRef } from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { cn } from '../lib'
import { Button } from '../shadcn'

export default function ImagePreview<T extends FieldValues>({
  alt,
  field,
  width = 100,
  height = 100,
  className,
}: {
  alt: string
  field: ControllerRenderProps<T, Path<T>>
  width?: number
  height?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  if (!field.value) return null

  const src =
    typeof field.value === 'string'
      ? field.value
      : URL.createObjectURL(field.value)

  const handleDelete = () => {
    const inputNode = ref.current?.parentNode?.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement

    field.onChange('')
    inputNode.value = ''
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative p-1 border border-gray-200 rounded-md inline-block self-start mt-2 bg-white',
        className,
      )}
    >
      <img
        alt={alt}
        className={cn('rounded-md', className)}
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
