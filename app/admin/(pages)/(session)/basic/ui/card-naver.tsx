import { Globe } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { BasicFormSchemaType } from '@cms/shared/schema'
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
} from '@cms/shared/shadcn'

export default function CardNaver({
  form,
}: {
  form: UseFormReturn<BasicFormSchemaType>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Globe className='size-5' /> 네이버 웹마스터 도구 관리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name='naverWebmasterId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>네이버 웹마스터 ID</FormLabel>
              <FormControl>
                <Input
                  placeholder='네이버 웹마스터 도구에서 발급받은 ID'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                네이버 웹마스터 도구에서 발급받은 사이트 ID를 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
