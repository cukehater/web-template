'use client'

import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { Input, Label } from '../shadcn'
import InputFilePreview from './input-file-preview'

export default function InputWithLabel({
  type = 'text',
  name,
  label,
  placeholder,
  required = false,
}: {
  type?: React.HTMLInputTypeAttribute
  name: string
  label: string
  placeholder?: string
  required?: boolean
}) {
  const id = useId()
  const { register, watch } = useForm()
  const file = watch(name)

  return (
    <div className='flex items-center gap-3 flex-wrap'>
      <Label className='w-24 cursor-pointer' htmlFor={id}>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </Label>
      <Input
        className='max-w-lg'
        id={id}
        placeholder={placeholder}
        required={required}
        type={type}
        {...register(name)}
        accept={type === 'file' ? 'image/*' : undefined}
      />
      {type === 'file' && file?.length > 0 && (
        <InputFilePreview file={file[0]} />
      )}
    </div>
  )
}
