'use client'

import { apiPost } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast, successToast } from '@cms/shared/lib'
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
} from '@cms/shared/shadcn'
import {
  ConfirmDialog,
  DateTimePicker,
  PageTopTitle,
  RichEditor,
  SwitchField
} from '@cms/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Loader2, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  generalFormSchema,
  GeneralFormSchemaType,
  initialGeneralFormData
} from '../../models/schema'

export default function GeneralCreatePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: GeneralFormSchemaType) => {
    setIsSubmitting(true)

    try {
      await apiPost('/api/post?table=general', {
        ...values,
        createdAt: values.createdAt || new Date().toISOString()
      })

      successToast(ALERT_MESSAGES.SAVE_SUCCESS)
      handleBack()
    } catch {
      errorToast(ALERT_MESSAGES.SAVE_ERROR)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    router.push('../general')
  }

  const form = useForm<GeneralFormSchemaType>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: initialGeneralFormData
  })

  return (
    <AlertDialog>
      <PageTopTitle description="갤러리 게시글 작성합니다." title="갤러리 게시글 작성" />

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
                  <RichEditor
                    content={field.value}
                    placeholder="내용을 입력하세요."
                    onChange={(value) => field.onChange(value)}
                  />
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
                    activeDescription="게시글을 게시 상태로 설정합니다."
                    checked={field.value}
                    inactiveDescription="게시글을 비게시 상태로 설정합니다."
                    label="게시글 상태"
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
            작성 완료
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
