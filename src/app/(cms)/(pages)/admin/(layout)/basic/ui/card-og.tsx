import { Share2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/app/(cms)/_shared/shadcn'
import { FormCard } from '@/app/(cms)/_shared/ui'
import ImagePreview from '@/app/(cms)/_shared/ui/image-preview'

import { BasicFormSchemaType } from '../model/schema'

export default function CardOpenGraph({
  form,
}: {
  form: UseFormReturn<BasicFormSchemaType>
}) {
  return (
    <FormCard icon={<Share2 className='size-5' />} title='Open Graph 관리'>
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name='ogTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>제목</FormLabel>
              <FormControl>
                <Input placeholder='제목을 입력해 주세요.' {...field} />
              </FormControl>
              <FormDescription>
                소셜 미디어에서 공유될 때 표시될 제목입니다. 비워두면 사이트
                제목이 사용됩니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='ogDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>설명</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='설명을 입력해 주세요.'
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                소셜 미디어에서 공유될 때 표시될 설명입니다. 비워두면 사이트
                설명이 사용됩니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='ogImage'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>이미지</FormLabel>
              <FormControl>
                <Input
                  accept='image/*'
                  type='file'
                  onChange={e => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>
                소셜 미디어에서 공유될 때 표시될 이미지입니다. 권장 크기:
                1200x630px
              </FormDescription>
              <FormMessage />
              {field.value && <ImagePreview alt='ogImage' src={field.value} />}
            </FormItem>
          )}
        />
      </div>
    </FormCard>
  )
}
