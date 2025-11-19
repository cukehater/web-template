'use client'

import { apiPost, apiPut } from '@cms/shared/api'
import { useSessionContext } from '@cms/shared/context'
import { ALERT_MESSAGES, errorToast, successToast } from '@cms/shared/lib'
import { ConfirmDialog, DateTimePicker, PageTopTitle, SwitchField } from '@cms/shared/ui'
import { RichEditor } from '@cms/shared/ui/editor'
import {
  AlertDialog,
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@cms/shared/ui/shadcn'
import { zodResolver } from '@hookform/resolvers/zod'
import { General } from '@prisma/client'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Loader2, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  generalFormSchema,
  GeneralFormSchemaType,
  initialGeneralFormData
} from '../../models/schema'

interface GeneralCreatePagePropsType {
  editData?: General | null
}

export default function GeneralCreatePage({ editData = null }: GeneralCreatePagePropsType) {
  const sessionContext = useSessionContext()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: GeneralFormSchemaType) => {
    setIsSubmitting(true)

    try {
      if (editData) {
        await apiPut(`/api/post/detail?table=general&slug=${editData.id}`, {
          ...values,
          createdAt: values.createdAt || new Date().toISOString()
        })
      } else {
        await apiPost('/api/post?table=general', {
          ...values,
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
      router.push('../../general')
    } else {
      router.push('../general')
    }
  }

  const form = useForm<GeneralFormSchemaType>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: editData ? editData : initialGeneralFormData
  })

  useEffect(() => {
    if (sessionContext?.session?.name && !editData) {
      form.setValue('writer', sessionContext.session.name)
    }
  }, [sessionContext, form, editData])

  return (
    <AlertDialog>
      <PageTopTitle
        description={`일반 게시글 ${editData ? '수정' : '작성'}합니다.`}
        title={`일반 게시글 ${editData ? '수정' : '작성'}`}
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
