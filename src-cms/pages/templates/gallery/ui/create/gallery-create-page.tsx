'use client'

import { apiPost, apiPut, uploadFilesFormFields } from '@cms/shared/api'
import { useSessionContext } from '@cms/shared/context'
import { ALERT_MESSAGES, errorToast, fileChangeHandler, successToast } from '@cms/shared/lib'
import { UploadResponseType } from '@cms/shared/models'
import {
  ConfirmDialog,
  DateTimePicker,
  ImagePreview,
  PageTopTitle,
  SwitchField
} from '@cms/shared/ui'
import { RichEditor } from '@cms/shared/ui/editor'
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
  Input
} from '@cms/shared/ui/shadcn'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gallery } from '@prisma/client'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Loader2, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  galleryFormSchema,
  GalleryFormSchemaType,
  initialGalleryFormData
} from '../../models/schema'

interface GalleryCreatePagePropsType {
  editData?: Gallery | null
}

export default function GalleryCreatePage({ editData = null }: GalleryCreatePagePropsType) {
  const sessionContext = useSessionContext()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: GalleryFormSchemaType) => {
    setIsSubmitting(true)

    try {
      const uploadImageValues = (await uploadFilesFormFields(values, [
        'thumbnail'
      ])) as UploadResponseType

      if (editData) {
        await apiPut('/api/post/detail?slug=' + editData.id, {
          ...values,
          ...uploadImageValues,
          createdAt: values.createdAt || new Date().toISOString()
        })
      } else {
        await apiPost('/api/post?table=gallery', {
          ...values,
          ...uploadImageValues,
          createdAt: values.createdAt || new Date().toISOString()
        })
      }

      successToast(ALERT_MESSAGES.SAVE_SUCCESS)
      handleBack()
    } catch {
      errorToast(ALERT_MESSAGES.SAVE_ERROR)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (editData) {
      router.push('../../gallery')
    } else {
      router.push('../gallery')
    }
  }

  const form = useForm<GalleryFormSchemaType>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: editData ? editData : initialGalleryFormData
  })

  useEffect(() => {
    if (sessionContext?.session?.name && !editData) {
      form.setValue('writer', sessionContext.session.name)
    }
  }, [sessionContext, form, editData])

  return (
    <AlertDialog>
      <PageTopTitle
        description={`갤러리 게시글 ${editData ? '수정' : '작성'}합니다.`}
        title={`갤러리 게시글 ${editData ? '수정' : '작성'}`}
      />

      <Card>
        <CardContent className="space-y-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>제목</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="제목을 입력하세요." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="writer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>작성자</FormLabel>
                  <FormControl>
                    <Input {...field} disabled readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>썸네일 이미지</FormLabel>
                  <FormControl>
                    <Input
                      name={field.name}
                      placeholder="썸네일 이미지를 입력하세요."
                      type="file"
                      onChange={(e) =>
                        fileChangeHandler(e, {
                          allowedFormat: 'IMAGE',
                          maxSize: 1024 * 1024,
                          field
                        })
                      }
                    />
                  </FormControl>
                  <FormDescription>권장 파일 크기: 1MB 이하</FormDescription>
                  <FormMessage />
                  <ImagePreview alt="썸네일 이미지" field={field} width={300} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="createdAt"
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>내용</FormLabel>
                  <FormControl>
                    <RichEditor field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isVisible"
              render={({ field }) => (
                <FormItem>
                  <SwitchField
                    activeDescription="현재 게시글이 활성화 상태입니다."
                    checked={field.value}
                    inactiveDescription="현재 게시글이 비활성화 상태입니다."
                    label="게시글 활성화 여부"
                    onCheckedChange={(value) => field.onChange(value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-end mt-2">
        <Button disabled={isSubmitting} onClick={form.handleSubmit(handleSubmit)}>
          <>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {`${editData ? '수정' : '작성'}`} 완료
          </>
        </Button>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <X className="size-4" /> 취소
          </Button>
        </AlertDialogTrigger>
      </div>

      <ConfirmDialog
        description={ALERT_MESSAGES.CANCEL_DESCRIPTION}
        title={ALERT_MESSAGES.CANCEL}
        onConfirm={handleBack}
      />
    </AlertDialog>
  )
}
