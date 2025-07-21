'use client'

import { useForm } from 'react-hook-form'

import { Input, Label } from '../shadcn'
import InputFilePreview from './input-file-preview'

export default function InputWithLabel({
  type = 'text',
  id,
  label,
  placeholder,
  required = false,
}: {
  type?: React.HTMLInputTypeAttribute
  id: string
  label: string
  placeholder?: string
  required?: boolean
}) {
  const { register, watch } = useForm()
  const file = watch(id)

  return (
    <div className='flex items-center gap-3 flex-wrap'>
      <Label className='w-20 cursor-pointer' htmlFor={id}>
        {label}
      </Label>
      <Input
        className='max-w-md'
        id={id}
        placeholder={placeholder}
        required={required}
        type={type}
        {...register(id)}
        accept={type === 'file' ? 'image/*' : undefined}
      />
      {type === 'file' && file?.length > 0 && (
        <InputFilePreview file={file[0]} />
      )}
    </div>
  )
}
