import { Building2 } from 'lucide-react'
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
import ImagePreview from '@/app/(cms)/_shared/ui/image-preview'

import { BasicFormSchemaType } from '../model/schema'

export default function CardCompany({
  form,
}: {
  form: UseFormReturn<BasicFormSchemaType>
}) {
  return (
    <FormCard icon={<Building2 className='size-5' />} title='회사 정보 관리'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <FormField
          control={form.control}
          name='companyName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                기업명 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='기업명을 입력해 주세요.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='representative'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                대표자명 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='대표자명을 입력해 주세요.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tel'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                대표 전화번호 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='대표 전화번호를 입력해 주세요.'
                  type='tel'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='fax'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>팩스번호</FormLabel>
              <FormControl>
                <Input
                  placeholder='팩스번호를 입력해 주세요.'
                  type='tel'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel className='text-sm font-medium'>
                대표 이메일 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='대표 이메일을 입력해 주세요.'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel className='text-sm font-medium'>
                주소 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='대표 주소를 입력해 주세요.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='businessNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                사업자등록번호
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='사업자등록번호를 입력해 주세요.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='industry'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>업종</FormLabel>
              <FormControl>
                <Input placeholder='업종을 입력해 주세요.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='logo'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel className='text-sm font-medium'>로고</FormLabel>
              <FormControl>
                <Input
                  accept='image/*'
                  name={field.name}
                  type='file'
                  onChange={e => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>파일 크기: 1MB 이하</FormDescription>
              {field.value && <ImagePreview alt='logo' field={field} />}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='favicon'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel className='text-sm font-medium'>파비콘</FormLabel>
              <FormControl>
                <Input
                  accept='image/*'
                  name={field.name}
                  type='file'
                  onChange={e => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>
                권장 사이즈: 32x32px / 파일 크기: 32KB 이하
              </FormDescription>
              <FormMessage />
              {field.value && (
                <ImagePreview alt='logo' field={field} height={32} width={32} />
              )}
            </FormItem>
          )}
        />
      </div>
    </FormCard>
  )
}
