import { Search } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'
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

export default function CardSEO({
  form,
}: {
  form: UseFormReturn<BasicFormSchemaType>
}) {
  return (
    <FormCard icon={<Search className='size-5' />} title='SEO 관리'>
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                사이트 제목 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='사이트 제목을 입력해 주세요.' {...field} />
              </FormControl>
              <FormDescription>
                브라우저 탭과 검색 결과에 표시될 제목입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                사이트 설명 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='사이트 설명을 입력해 주세요.'
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                검색 엔진에 표시될 사이트 설명입니다. 150자 이내로 작성하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='keywords'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                키워드 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='키워드를 쉼표로 구분하여 입력해 주세요.'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                검색 최적화를 위한 키워드입니다. 쉼표로 구분하여 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormCard>
  )
}
