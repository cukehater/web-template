'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SheetClose,
  SheetFooter,
  Switch,
} from '@/app/(cms)/_shared/shadcn'

export const formSchema = z.object({
  isActive: z.boolean(),
  title: z.string().nonempty({ message: '제목을 입력해 주세요.' }),
  imageUrl: z.string().nonempty({ message: '이미지를 선택해 주세요.' }),
  width: z.number().nonnegative({ message: '너비를 입력해 주세요.' }),
  height: z.number().nonnegative({ message: '높이를 입력해 주세요.' }),
  x: z.number().nonnegative({ message: 'X 좌표를 입력해 주세요.' }),
  y: z.number().nonnegative({ message: 'Y 좌표를 입력해 주세요.' }),
  zIndex: z.number().nonnegative({ message: 'Z 순서를 입력해 주세요.' }),
  startDate: z.date().min(new Date(), { message: '시작일을 선택해 주세요.' }),
  endDate: z.date().min(new Date(), { message: '종료일을 선택해 주세요.' }),
})

export default function AddPopupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: true,
      title: '',
      imageUrl: '',
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      zIndex: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return

    setIsLoading(true)

    const {
      isActive,
      title,
      imageUrl,
      width,
      height,
      x,
      y,
      zIndex,
      startDate,
      endDate,
    } = values

    console.log('values', values)

    try {
    } catch {
      setError('팝업 추가 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid flex-1 auto-rows-min gap-6 px-4'>
            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>노출 여부</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder='제목을 입력해 주세요.' {...field} />
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
                  <FormLabel>이미지</FormLabel>
                  <FormControl>
                    <Input type='file' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='width'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>너비</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='height'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>높이</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='x'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>X 좌표</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='y'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Y 좌표</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='zIndex'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Z 순서</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>시작일 </FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        {...field}
                        value={field.value.toISOString().slice(0, 16)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>종료일</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        {...field}
                        value={field.value.toISOString().slice(0, 16)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
      <SheetFooter>
        <Button onClick={() => onSubmit(form.getValues())}>추가하기</Button>
        <SheetClose asChild>
          <Button variant='outline'>취소</Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
