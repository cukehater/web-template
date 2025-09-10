'use client'

import { useSessionContext } from '@cms/app/context'
import { apiPatch } from '@cms/shared/api'
import { ALERT_MESSAGES, successToast } from '@cms/shared/lib'
import {
  Alert,
  AlertDialogHeader,
  AlertTitle,
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@cms/shared/shadcn'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  initialNameUpdateFormData,
  nameUpdateFormSchema,
  NameUpdateFormSchemaType
} from '../models/schema'

interface NameUpdateModalPropsType {
  id: string
  onClose: () => void
}

export default function NameUpdateModal({ id, onClose }: NameUpdateModalPropsType) {
  const sessionContext = useSessionContext()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<NameUpdateFormSchemaType>({
    resolver: zodResolver(nameUpdateFormSchema),
    defaultValues: initialNameUpdateFormData
  })

  async function onSubmit(values: NameUpdateFormSchemaType) {
    try {
      setIsLoading(true)

      const res = await apiPatch('/api/account?type=name', {
        id,
        name: values.name
      })

      if (!res.ok) {
        setError(res.message || ALERT_MESSAGES.REQUEST_ERROR)
        return
      }

      sessionContext?.refetchSession()
      successToast(ALERT_MESSAGES.REQUEST_SUCCESS)
      form.reset()
      onClose()
      router.refresh()
    } catch {
      setError(ALERT_MESSAGES.REQUEST_ERROR)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <DialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <DialogTitle>관리자 계정 이름 변경</DialogTitle>
          <DialogDescription>새 이름을 입력해 주세요.</DialogDescription>
        </AlertDialogHeader>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새 이름</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>
                취소
              </Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> 변경 중
                </>
              ) : (
                '변경 완료'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  )
}
