import { Share2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { fileChangeHandler } from '@/app/(cms)/_shared/lib'
import { BasicFormSchemaType } from '@/app/(cms)/_shared/schema'
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
} from '@/app/(cms)/_shared/shadcn'
import ImagePreview from '@/app/(cms)/_shared/ui/image-preview'

export default function CardOpenGraph({
  form,
}: {
  form: UseFormReturn<BasicFormSchemaType>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Share2 className='size-5' /> Open Graph 관리
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <FormField
          control={form.control}
          name='ogTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>제목</FormLabel>
              <FormControl>
                <Input placeholder='제목을 입력해 주세요.' {...field} />
              </FormControl>
              <FormDescription>
                소셜 미디어에서 공유될 때 표시될 제목입니다. 비워두면 사이트
                제목이 사용됩니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='ogDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>설명</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='설명을 입력해 주세요.'
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                소셜 미디어에서 공유될 때 표시될 설명입니다. 비워두면 사이트
                설명이 사용됩니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='ogImage'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>이미지</FormLabel>
              <FormControl>
                <Input
                  name={field.name}
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
              <FormDescription>
                소셜 미디어에서 공유될 때 표시될 이미지입니다. <br />
                권장 파일 크기: 1MB 이하 / 권장 사이즈: 1200x630px
              </FormDescription>
              <FormMessage />
              <ImagePreview alt='logo' field={field} />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
