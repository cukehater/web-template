'use client'

import { Cog, Loader2, Save } from 'lucide-react'
import { useEffect } from 'react'

import { Button, Form } from '@/app/(cms)/_shared/shadcn'
import { PageTopTitle } from '@/app/(cms)/_shared/ui'

import { BasicFormSchemaType } from '../model/schema'
import { useBasicForm } from '../model/useBasicForm'
import CardCompany from './card-company'
import CardGoogleAnalytics from './card-ga'
import CardNaver from './card-naver'
import CardOpenGraph from './card-og'
import CardSEO from './card-seo'

export default function Container({
  initialData,
}: {
  initialData: BasicFormSchemaType | null
}) {
  const { form, onSubmit } = useBasicForm()

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  return (
    <>
      <PageTopTitle
        description='사이트 기본 설정을 관리합니다.'
        icon={Cog}
        title='사이트 기본 설정'
      >
        <Button
          disabled={form.formState.isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className='animate-spin' />
              저장 중
            </>
          ) : (
            <>
              <Save />
              저장하기
            </>
          )}
        </Button>
      </PageTopTitle>
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='columns-1 lg:columns-2 gap-6 space-y-6'>
            <CardCompany form={form} />
            <CardSEO form={form} />
            <CardOpenGraph form={form} />
            <CardGoogleAnalytics form={form} />
            <CardNaver form={form} />
          </div>
        </form>
      </Form>
    </>
  )
}
