import { Globe } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/app/(cms)/_shared/shadcn'
import { FormCard } from '@/app/(cms)/_shared/ui'

import { BasicFormSchemaType } from '../model/schema'

export default function CardNaver({
  form,
}: {
  form: UseFormReturn<BasicFormSchemaType>
}) {
  return (
    <FormCard
      icon={<Globe className='size-5' />}
      title='네이버 웹마스터 도구 관리'
    >
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name='naverWebmasterId'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                네이버 웹마스터 ID
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='네이버 웹마스터 도구에서 발급받은 ID'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                네이버 웹마스터 도구에서 발급받은 사이트 ID를 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormCard>
  )
}
