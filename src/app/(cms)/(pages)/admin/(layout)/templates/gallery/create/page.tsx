'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { ALERT_MESSAGE, fileChangeHandler } from '@/app/(cms)/_shared/lib'
import {
  AlertDialog,
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/app/(cms)/_shared/shadcn'
import {
  ConfirmDialog,
  DateTimePicker,
  PageTopTitle,
  RichEditor,
  SwitchField,
} from '@/app/(cms)/_shared/ui'
import ImagePreview from '@/app/(cms)/_shared/ui/image-preview'

export default function GalleryCreatePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    await fetch('/api/gallery', {
      method: 'POST',
      body: JSON.stringify(values),
    })

    // router.push('../gallery')
  }

  const handleCancel = () => {
    router.push('/admin/templates/gallery')
  }

  const formSchema = z.object({
    title: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
    thumbnail: z.union([z.string(), z.instanceof(File)]),
    createdAt: z.union([z.date(), z.string()]),
    content: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
    isVisible: z.boolean(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      thumbnail: '',
      createdAt: '',
      content: '',
      isVisible: true,
    },
  })

  return (
    <AlertDialog>
      <PageTopTitle
        description='갤러리 게시글 작성합니다.'
        title='갤러리 게시글 작성'
      />

      <Card>
        <CardContent className='space-y-4'>
          <Form {...form}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>제목</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='제목을 입력하세요.' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='thumbnail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>썸네일 이미지</FormLabel>
                  <FormControl>
                    <Input
                      name={field.name}
                      placeholder='썸네일 이미지를 입력하세요.'
                      type='file'
                      onChange={e =>
                        fileChangeHandler(e, {
                          allowedFormat: 'IMAGE',
                          maxSize: 1024 * 1024,
                          field,
                        })
                      }
                    />
                  </FormControl>
                  <FormDescription>권장 파일 크기: 1MB 이하</FormDescription>
                  <FormMessage />
                  <ImagePreview alt='썸네일 이미지' field={field} width={300} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='createdAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>작성일</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>내용</FormLabel>
                  <RichEditor
                    content={field.value}
                    placeholder='내용을 입력하세요.'
                    onChange={value => field.onChange(value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isVisible'
              render={({ field }) => (
                <FormItem>
                  <SwitchField
                    activeDescription='현재 게시글을 게시 상태로 설정합니다.'
                    field={field}
                    inactiveDescription='현재 게시글을 비게시 상태로 설정합니다.'
                    label='게시글 상태'
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
      </Card>

      <div className='flex gap-2 justify-end mt-2'>
        <Button
          disabled={isSubmitting}
          onClick={form.handleSubmit(handleSubmit)}
        >
          <Save className='size-4' />
          {isSubmitting ? '저장 중...' : '작성 완료'}
        </Button>
        <AlertDialogTrigger asChild>
          <Button variant='outline'>
            <X className='size-4' /> 취소
          </Button>
        </AlertDialogTrigger>
      </div>

      <ConfirmDialog
        description={ALERT_MESSAGE.CANCEL_DESCRIPTION}
        title={ALERT_MESSAGE.CANCEL}
        onConfirm={handleCancel}
      />
    </AlertDialog>
  )
}
