import { Search } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { BasicFormSchemaType } from '@/cms/shared/schema'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/cms/shared/shadcn'

export default function CardSEO({
  form,
}: {
  form: UseFormReturn<BasicFormSchemaType>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Search className='size-5' /> SEO 관리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel required>사이트 제목</FormLabel>
              <FormControl>
                <Input placeholder='사이트 제목을 입력해 주세요.' {...field} />
              </FormControl>
              <FormDescription>
                브라우저 탭과 검색 결과에 표시될 제목입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel required>사이트 설명</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='사이트 설명을 입력해 주세요.'
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                검색 엔진에 표시될 사이트 설명입니다. 150자 이내로 작성하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='keywords'
          render={({ field }) => (
            <FormItem>
              <FormLabel required>키워드</FormLabel>
              <FormControl>
                <Input
                  placeholder='키워드를 쉼표로 구분하여 입력해 주세요.'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                검색 최적화를 위한 키워드입니다. 쉼표로 구분하여 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
