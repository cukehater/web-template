'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FileCog, Save, Settings } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/app/(cms)/_shared/shadcn'
import { PageTopTitle } from '@/app/(cms)/_shared/ui'

// 폼 검증 스키마
const basicSettingsSchema = z.object({
  companyName: z.string().min(1, '기업명을 입력해 주세요.'),
  title: z.string().min(1, '사이트 제목을 입력해 주세요.'),
  description: z.string().min(1, '사이트 설명을 입력해 주세요.'),
  keywords: z.string().min(1, '키워드를 입력해 주세요.'),
  representative: z.string().min(1, '대표자명을 입력해 주세요.'),
  tel: z.string().min(1, '대표 전화번호를 입력해 주세요.'),
  fax: z.string().optional(),
  email: z.string().email('올바른 이메일 형식을 입력해 주세요.'),
  address: z.string().min(1, '주소를 입력해 주세요.'),
  businessNumber: z.string().optional(),
  industry: z.string().optional(),
  favicon: z.any().optional(),
  ogTitle: z.string().optional(),
  ogName: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.any().optional(),
})

type BasicSettingsForm = z.infer<typeof basicSettingsSchema>

export default function BasicSettingsPage() {
  const form = useForm<BasicSettingsForm>({
    resolver: zodResolver(basicSettingsSchema),
    defaultValues: {
      companyName: '',
      title: '',
      description: '',
      keywords: '',
      representative: '',
      tel: '',
      fax: '',
      email: '',
      address: '',
      businessNumber: '',
      industry: '',
      ogTitle: '',
      ogName: '',
      ogDescription: '',
    },
  })

  function onSubmit(values: BasicSettingsForm) {
    console.log('폼 데이터:', values)
    // TODO: API 호출 로직 추가
  }

  return (
    <>
      <PageTopTitle title='사이트 기본 설정'>
        <Button
          className='px-6 py-2 text-white'
          disabled={form.formState.isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          <Save className='w-4 h-4 mr-2' />
          {form.formState.isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </PageTopTitle>

      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col lg:flex-row gap-6'>
            {/* 기본 정보 섹션 */}
            <div className='bg-white rounded-lg border border-gray-200 p-6 flex-1'>
              <div className='flex items-center gap-2 mb-6'>
                <Settings className='w-5 h-5' />
                <h3 className='text-lg font-semibold text-gray-900'>
                  기본 정보
                </h3>
              </div>

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
                        <Input
                          placeholder='기업명을 입력해 주세요.'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        사이트 제목 <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='사이트 제목을 입력해 주세요.'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel className='text-sm font-medium'>
                        사이트 설명 <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='사이트 설명을 입력해 주세요.'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        검색 엔진에 표시될 사이트 설명입니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='keywords'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
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
                        검색 최적화를 위한 키워드입니다. 쉼표로 구분하여
                        입력하세요.
                      </FormDescription>
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
                        <Input
                          placeholder='대표자명을 입력해 주세요.'
                          {...field}
                        />
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
                      <FormLabel className='text-sm font-medium'>
                        팩스번호
                      </FormLabel>
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
                    <FormItem>
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
                        <Input
                          placeholder='대표 주소를 입력해 주세요.'
                          {...field}
                        />
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
                      <FormLabel className='text-sm font-medium'>
                        업종
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='업종을 입력해 주세요.' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='favicon'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel className='text-sm font-medium'>
                        파비콘
                      </FormLabel>
                      <FormControl>
                        <Input
                          accept='image/*'
                          type='file'
                          onChange={e => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        브라우저 탭에 표시될 아이콘입니다. 권장 크기: 32x32px
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 오픈 그래프 섹션 */}
            <div className='bg-white rounded-lg border border-gray-200 p-6 flex-1'>
              <div className='flex items-center gap-2 mb-6'>
                <FileCog className='w-5 h-5' />
                <h3 className='text-lg font-semibold text-gray-900'>
                  오픈 그래프
                </h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='ogTitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        제목
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='오픈 그래프 제목을 입력해 주세요.'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        소셜 미디어에서 공유될 때 표시될 제목입니다.
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
                      <FormLabel className='text-sm font-medium'>
                        사이트 이름
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='오픈 그래프 설명을 입력해 주세요.'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        소셜 미디어에서 공유될 때 표시될 사이트 이름입니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='ogName'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel className='text-sm font-medium'>
                        설명
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='오픈 그래프 설명을 입력해 주세요.'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        소셜 미디어에서 공유될 때 표시될 설명입니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='ogImage'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel className='text-sm font-medium'>
                        이미지
                      </FormLabel>
                      <FormControl>
                        <Input
                          accept='image/*'
                          type='file'
                          onChange={e => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormDescription>
                        소셜 미디어에서 공유될 때 표시될 이미지입니다. 권장
                        크기: 1200x630px
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
