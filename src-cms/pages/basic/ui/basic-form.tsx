'use client'

import { apiPost, uploadFilesFormFields } from '@cms/shared/api'
import {
  ALERT_MESSAGES,
  errorToast,
  fileChangeHandler,
  hasFormChange,
  infoToast,
  successToast
} from '@cms/shared/lib'
import { UploadResponseType } from '@cms/shared/models'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea
} from '@cms/shared/shadcn'
import { ImagePreview, PageTopTitle } from '@cms/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { BarChart3, Building2, Cog, Globe, Loader2, Save, Search, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { basicFormSchema, type BasicFormSchemaType } from '../models/schema'

export default function BasicForm({ defaultValues }: { defaultValues: BasicFormSchemaType }) {
  const router = useRouter()
  const form = useForm<BasicFormSchemaType>({
    resolver: zodResolver(basicFormSchema),
    // TODO: 초기 값 설정 수정
    defaultValues
  })

  async function onSubmit(values: BasicFormSchemaType) {
    try {
      const watchedValues = form.watch()

      if (!hasFormChange(watchedValues, defaultValues)) {
        infoToast(ALERT_MESSAGES.NO_CHANGES)
        return
      }

      const uploadImageValues = (await uploadFilesFormFields(values, [
        'logo',
        'favicon',
        'ogImage'
      ])) as UploadResponseType

      const result = await apiPost('/api/basic', {
        body: {
          ...values,
          ...uploadImageValues
        }
      })

      if (!result.ok) {
        errorToast(ALERT_MESSAGES.SAVE_ERROR)
        return
      }

      successToast(ALERT_MESSAGES.SAVE_SUCCESS)
      form.reset({ ...values, ...uploadImageValues })
      router.refresh()
    } catch {
      errorToast(ALERT_MESSAGES.REQUEST_ERROR)
    }
  }

  return (
    <>
      <PageTopTitle
        description="사이트 기본 설정을 관리합니다."
        icon={Cog}
        title="사이트 기본 설정"
      >
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              변경 내용 저장 중
            </>
          ) : (
            <>
              <Save />
              변경 내용 저장
            </>
          )}
        </Button>
      </PageTopTitle>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="columns-1 lg:columns-2 gap-6 space-y-6">
            {/* 회사 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Building2 className="size-5" /> 회사 정보 관리
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>기업명</FormLabel>
                      <FormControl>
                        <Input placeholder="기업명을 입력해 주세요." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="representative"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>대표자명</FormLabel>
                      <FormControl>
                        <Input placeholder="대표자명을 입력해 주세요." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>대표 전화번호</FormLabel>
                      <FormControl>
                        <Input placeholder="대표 전화번호를 입력해 주세요." type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">팩스번호</FormLabel>
                      <FormControl>
                        <Input placeholder="팩스번호를 입력해 주세요." type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel required>대표 이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="대표 이메일을 입력해 주세요." type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel required>주소</FormLabel>
                      <FormControl>
                        <Input placeholder="대표 주소를 입력해 주세요." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">사업자등록번호</FormLabel>
                      <FormControl>
                        <Input placeholder="사업자등록번호를 입력해 주세요." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">업종</FormLabel>
                      <FormControl>
                        <Input placeholder="업종을 입력해 주세요." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-sm font-medium">로고</FormLabel>
                      <FormControl>
                        <Input
                          name={field.name}
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
                      <FormMessage />
                      <FormDescription>권장 파일 크기: 1MB 이하</FormDescription>
                      <ImagePreview alt="logo" field={field} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="favicon"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-sm font-medium">파비콘</FormLabel>
                      <FormControl>
                        <Input
                          name={field.name}
                          type="file"
                          onChange={(e) =>
                            fileChangeHandler(e, {
                              allowedFormat: 'IMAGE',
                              maxSize: 1024 * 32,
                              field
                            })
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        권장 파일 크기: 32KB 이하 / 권장 사이즈: 32x32px
                      </FormDescription>
                      <FormMessage />
                      <ImagePreview
                        alt="logo"
                        className="rounded-sm"
                        field={field}
                        height={32}
                        width={32}
                      />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Search className="size-5" /> SEO 관리
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>사이트 제목</FormLabel>
                      <FormControl>
                        <Input placeholder="사이트 제목을 입력해 주세요." {...field} />
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>사이트 설명</FormLabel>
                      <FormControl>
                        <Textarea placeholder="사이트 설명을 입력해 주세요." rows={3} {...field} />
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
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>키워드</FormLabel>
                      <FormControl>
                        <Input placeholder="키워드를 쉼표로 구분하여 입력해 주세요." {...field} />
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

            {/* Open Graph */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Share2 className="size-5" /> Open Graph 관리
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="ogTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목</FormLabel>
                      <FormControl>
                        <Input placeholder="제목을 입력해 주세요." {...field} />
                      </FormControl>
                      <FormDescription>
                        소셜 미디어에서 공유될 때 표시될 제목입니다. 비워두면 사이트 제목이
                        사용됩니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ogDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>설명</FormLabel>
                      <FormControl>
                        <Textarea placeholder="설명을 입력해 주세요." rows={3} {...field} />
                      </FormControl>
                      <FormDescription>
                        소셜 미디어에서 공유될 때 표시될 설명입니다. 비워두면 사이트 설명이
                        사용됩니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ogImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이미지</FormLabel>
                      <FormControl>
                        <Input
                          name={field.name}
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
                      <FormDescription>
                        소셜 미디어에서 공유될 때 표시될 이미지입니다. <br />
                        권장 파일 크기: 1MB 이하 / 권장 사이즈: 1200x630px
                      </FormDescription>
                      <FormMessage />
                      <ImagePreview alt="logo" field={field} />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* GA */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <BarChart3 className="size-5" /> Google Analytics 관리
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="googleAnalyticsId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Analytics ID</FormLabel>
                      <FormControl>
                        <Input placeholder="G-XXXXXXXXXX 또는 UA-XXXXXXXXX-X" {...field} />
                      </FormControl>
                      <FormDescription>
                        Google Analytics 측정 ID를 입력하세요. (예: G-XXXXXXXXXX)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Naver 웹마스터 도구 */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Globe className="size-5" /> 네이버 웹마스터 도구 관리
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="naverWebmasterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>네이버 웹마스터 ID</FormLabel>
                      <FormControl>
                        <Input placeholder="네이버 웹마스터 도구에서 발급받은 ID" {...field} />
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
          </div>
        </form>
      </Form>
    </>
  )
}
