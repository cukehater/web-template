'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Loader2, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { uploadFilesFormFields } from '@/app/(cms)/_shared/api'
import {
  ALERT_MESSAGE,
  errorToast,
  fileChangeHandler,
  successToast,
} from '@/app/(cms)/_shared/lib'
import {
  galleryFormSchema,
  GalleryFormSchemaType,
  initialGalleryFormData,
} from '@/app/(cms)/_shared/schema'
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

  const handleSubmit = async (values: GalleryFormSchemaType) => {
    setIsSubmitting(true)

    try {
      const uploadImageValues =
        await uploadFilesFormFields<GalleryFormSchemaType>(values, [
          'thumbnail',
        ])

      await fetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          ...uploadImageValues,
          createdAt: values.createdAt || new Date().toISOString(),
        }),
      })

      successToast(ALERT_MESSAGE.SAVE_SUCCESS)
      handleBack()
    } catch {
      errorToast(ALERT_MESSAGE.SAVE_ERROR)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    router.push('../gallery')
  }

  const form = useForm<GalleryFormSchemaType>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: initialGalleryFormData,
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
                    activeDescription='게시글을 게시 상태로 설정합니다.'
                    checked={field.value}
                    inactiveDescription='게시글을 비게시 상태로 설정합니다.'
                    label='게시글 상태'
                    onCheckedChange={value => field.onChange(value)}
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
          <>
            {isSubmitting ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <Save className='size-4' />
            )}
            작성 완료
          </>
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
        onConfirm={handleBack}
      />
    </AlertDialog>
  )
}
