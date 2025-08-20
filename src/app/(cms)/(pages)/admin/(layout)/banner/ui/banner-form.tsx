'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, Eye, EyeOff, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/(cms)/_shared/shadcn'
import { Input } from '@/app/(cms)/_shared/shadcn'
import { Button } from '@/app/(cms)/_shared/shadcn'
import { Textarea } from '@/app/(cms)/_shared/shadcn'
import { Switch } from '@/app/(cms)/_shared/shadcn'
import { Calendar } from '@/app/(cms)/_shared/shadcn'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/(cms)/_shared/shadcn'
import { Card, CardContent } from '@/app/(cms)/_shared/shadcn'

interface Banner {
  id: string
  title: string
  description?: string
  imageUrl: string
  linkUrl?: string
  order: number
  isActive: boolean
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

interface BannerFormProps {
  banner?: Banner
  onSuccess?: () => void
  onCancel?: () => void
}

const bannerSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요.'),
    description: z.string().optional(),
    imageUrl: z.string().url('올바른 이미지 URL을 입력해주세요.'),
    linkUrl: z
      .string()
      .url('올바른 링크 URL을 입력해주세요.')
      .optional()
      .or(z.literal('')),
    order: z.number().min(0, '순서는 0 이상이어야 합니다.'),
    isActive: z.boolean(),
    startDate: z.date({
      message: '시작일을 선택해주세요.',
    }),
    endDate: z.date({
      message: '종료일을 선택해주세요.',
    }),
  })
  .refine(data => data.endDate > data.startDate, {
    message: '종료일은 시작일보다 늦어야 합니다.',
    path: ['endDate'],
  })

type BannerFormData = z.infer<typeof bannerSchema>

export default function BannerForm({
  banner,
  onSuccess,
  onCancel,
}: BannerFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showImagePreview, setShowImagePreview] = useState(false)

  const form = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: banner?.title || '',
      description: banner?.description || '',
      imageUrl: banner?.imageUrl || '',
      linkUrl: banner?.linkUrl || '',
      order: banner?.order || 0,
      isActive: banner?.isActive ?? true,
      startDate: banner?.startDate ? new Date(banner.startDate) : new Date(),
      endDate: banner?.endDate ? new Date(banner.endDate) : new Date(),
    },
  })

  const imageUrl = form.watch('imageUrl')

  const onSubmit = async (data: BannerFormData) => {
    setIsSubmitting(true)
    try {
      const url = banner ? `/api/banner/${banner.id}` : '/api/banner'
      const method = banner ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          startDate: data.startDate.toISOString(),
          endDate: data.endDate.toISOString(),
        }),
      })

      if (response.ok) {
        onSuccess?.()
        router.refresh()
      } else {
        const error = await response.json()
        console.error('배너 저장 오류:', error)
      }
    } catch (error) {
      console.error('배너 저장 오류:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          {/* 이미지 미리보기 */}
          {imageUrl && (
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-medium'>이미지 미리보기</h4>
                  <Button
                    size='sm'
                    type='button'
                    variant='ghost'
                    onClick={() => setShowImagePreview(!showImagePreview)}
                  >
                    {showImagePreview ? (
                      <EyeOff className='size-4' />
                    ) : (
                      <Eye className='size-4' />
                    )}
                  </Button>
                </div>
                {showImagePreview && (
                  <div className='aspect-[16/9] rounded-lg overflow-hidden border'>
                    <img
                      alt='미리보기'
                      className='w-full h-full object-cover'
                      src={imageUrl}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목 *</FormLabel>
                <FormControl>
                  <Input placeholder='배너 제목을 입력하세요' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>설명</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='배너 설명을 입력하세요 (선택사항)'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이미지 URL *</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='https://example.com/image.jpg'
                      {...field}
                    />
                    <Button
                      size='sm'
                      type='button'
                      variant='outline'
                      onClick={() => setShowImagePreview(!showImagePreview)}
                    >
                      <Upload className='size-4' />
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  배너에 표시될 이미지의 URL을 입력하세요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='linkUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>링크 URL</FormLabel>
                <FormControl>
                  <Input placeholder='https://example.com' {...field} />
                </FormControl>
                <FormDescription>
                  배너 클릭 시 이동할 링크 URL을 입력하세요 (선택사항).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='order'
            render={({ field }) => (
              <FormItem>
                <FormLabel>순서</FormLabel>
                <FormControl>
                  <Input
                    min='0'
                    type='number'
                    {...field}
                    onChange={e =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormDescription>
                  배너의 표시 순서를 설정합니다. 숫자가 작을수록 먼저
                  표시됩니다.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>시작일 *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className='w-full pl-3 text-left font-normal'
                          variant='outline'
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ko })
                          ) : (
                            <span>날짜를 선택하세요</span>
                          )}
                          <CalendarIcon className='ml-auto size-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align='start' className='w-auto p-0'>
                      <Calendar
                        initialFocus
                        disabled={date =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>종료일 *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className='w-full pl-3 text-left font-normal'
                          variant='outline'
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ko })
                          ) : (
                            <span>날짜를 선택하세요</span>
                          )}
                          <CalendarIcon className='ml-auto size-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align='start' className='w-auto p-0'>
                      <Calendar
                        initialFocus
                        disabled={date =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>활성화</FormLabel>
                  <FormDescription>
                    배너를 활성화하면 사이트에 표시됩니다.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex justify-end space-x-2'>
            <Button type='button' variant='outline' onClick={onCancel}>
              취소
            </Button>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? '저장 중...' : banner ? '수정' : '추가'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
