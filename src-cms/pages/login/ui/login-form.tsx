'use client'

import {
  Alert,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@cms/shared/shadcn'
import { AlertCircleIcon, GalleryVerticalEnd, Loader2 } from 'lucide-react'

import useLogin from '../models/use-login'

export default function LoginForm({ logo }: { logo: string }) {
  const { form, onSubmit, isLoading, error } = useLogin()

  return (
    <Form {...form}>
      <form className="w-[90%] sm:w-96" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            {logo ? (
              <img alt="logo" className="max-w-36" src={logo} />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-6" />
              </div>
            )}
            <h3 className="text-xl font-bold">Administrator</h3>
          </div>
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <Input placeholder="아이디를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input placeholder="비밀번호를 입력하세요" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="h-10" disabled={isLoading} type="submit">
            {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : '로그인'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
        </div>
      </form>
    </Form>
  )
}
