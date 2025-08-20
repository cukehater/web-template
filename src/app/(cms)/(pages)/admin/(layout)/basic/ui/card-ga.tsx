import { BarChart3 } from 'lucide-react'
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

export default function CardGoogleAnalytics({
  form,
}: {
  form: UseFormReturn<BasicFormSchemaType>
}) {
  return (
    <FormCard
      icon={<BarChart3 className='size-5' />}
      title='Google Analytics 관리'
    >
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name='googleAnalyticsId'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                Google Analytics ID
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='G-XXXXXXXXXX 또는 UA-XXXXXXXXX-X'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Google Analytics 측정 ID를 입력하세요. (예: G-XXXXXXXXXX)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormCard>
  )
}
