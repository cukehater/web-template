'use client'

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
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  initialPasswordUpdateFormData,
  passwordUpdateFormSchema,
  PasswordUpdateFormSchemaType
} from '../models/schema'

export default function PasswordUpdateModal({ id }: { id: string }) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<PasswordUpdateFormSchemaType>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: initialPasswordUpdateFormData
  })

  async function onSubmit(values: PasswordUpdateFormSchemaType) {
    try {
      setIsLoading(true)

      const res = await apiPatch('/api/account', {
        id,
        password: values.password,
        newPassword: values.newPassword
      })

      if (!res.ok) {
        setError(res.message || ALERT_MESSAGES.REQUEST_ERROR)
        return
      }

      successToast(ALERT_MESSAGES.REQUEST_SUCCESS)
      form.reset()
      dialogCloseRef.current?.click()
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
          <DialogTitle>관리자 계정 비밀번호 변경</DialogTitle>
          <DialogDescription>현재 비밀번호와 새 비밀번호를 입력해 주세요.</DialogDescription>
        </AlertDialogHeader>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>현재 비밀번호</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새 비밀번호</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새 비밀번호 확인</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
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
            <DialogClose ref={dialogCloseRef} asChild>
              <Button variant="outline">취소</Button>
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
