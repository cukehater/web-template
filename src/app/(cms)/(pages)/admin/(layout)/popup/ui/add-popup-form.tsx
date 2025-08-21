'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'

import { errorToast, successToast } from '@/app/(cms)/_shared/lib'
import {
  Button,
  Checkbox,
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

const formSchema = z.object({
  isActive: z.boolean(),
  title: z.string().min(1, { message: '제목을 입력해 주세요' }),
  // imageUrl: z
  //   .instanceof(File, { message: '이미지를 선택해 주세요' })
  //   .nullable()
  //   .refine(file => file !== null, { message: '이미지를 선택해 주세요' }),
  width: z
    .number()
    .min(300, { message: '최소 너비는 300px 입니다' })
    .max(600, { message: '최대 너비는 600px 입니다' }),
  height: z
    .number()
    .min(300, { message: '최소 높이는 300px 입니다' })
    .max(1000, { message: '최대 높이는 1000px 입니다' }),
  x: z.number(),
  y: z.number(),
  zIndex: z.number(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  noEndDate: z.boolean(),
})

type FormSchemaType = z.infer<typeof formSchema>

export default function AddPopupForm() {
  const sheetCloseBtnRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: false,
      title: '제목 테스트',
      // imageUrl: null,
      width: 300,
      height: 300,
      x: 0,
      y: 0,
      zIndex: 1,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      noEndDate: false,
    },
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async formData => {
    const res = await fetch('/api/popup/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      errorToast('팝업 추가를 실패했습니다.')
      return
    }

    successToast('팝업 추가가 완료되었습니다.')

    form.reset()
    sheetCloseBtnRef.current?.click()
    setTimeout(() => {
      router.refresh()
    }, 300)
  }

  const handleCheckedChange = (checked: boolean) => {
    form.setValue('isActive', checked)
  }

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0] || null
  //   setSelectedFile(file)
  //   form.setValue('imageUrl', file)
  // }

  const handleSetNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormSchemaType
    const value = parseInt(e.target.value)

    if (isNaN(value)) {
      form.setValue(name, '')
      return
    }
    form.setValue(name, value * 1)
  }

  const handleNoEndDateChange = (checked: boolean) => {
    form.setValue('noEndDate', checked)
    if (checked) {
      form.setValue('endDate', null)
    } else {
      form.setValue('endDate', new Date().toISOString().split('T')[0])
    }
  }

  const noEndDate = form.watch('noEndDate')

  return (
    <>
      <Form {...form}>
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
                    onCheckedChange={handleCheckedChange}
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
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input placeholder='제목을 입력해 주세요' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name='imageUrl'
            render={() => (
              <FormItem>
                <FormLabel>이미지</FormLabel>
                <FormControl>
                  <Input
                    accept='image/*'
                    type='file'
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
                {selectedFile && (
                  <img
                    alt='popup'
                    className='rounded-md w-[100px] '
                    src={URL.createObjectURL(selectedFile)}
                  />
                )}
              </FormItem>
            )}
          /> */}

          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='width'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>너비</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      {...field}
                      value={String(field.value)}
                      onChange={handleSetNumber}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type='number'
                      {...field}
                      value={String(field.value)}
                      onChange={handleSetNumber}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type='number'
                      {...field}
                      value={String(field.value)}
                      onChange={handleSetNumber}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type='number'
                      {...field}
                      value={String(field.value)}
                      onChange={handleSetNumber}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type='number'
                      {...field}
                      value={String(field.value)}
                      onChange={handleSetNumber}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
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
                      disabled={noEndDate}
                      value={noEndDate ? '' : field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />

                  <FormField
                    control={form.control}
                    name='noEndDate'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center  space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={handleNoEndDateChange}
                          />
                        </FormControl>
                        <FormLabel>종료일 없음</FormLabel>
                      </FormItem>
                    )}
                  />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
      <SheetFooter>
        <Button onClick={form.handleSubmit(onSubmit)}>추가</Button>
        <SheetClose ref={sheetCloseBtnRef} asChild>
          <Button variant='outline'>취소</Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
