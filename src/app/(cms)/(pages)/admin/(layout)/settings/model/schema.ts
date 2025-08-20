import { z } from 'zod'

export const settingFormSchema = z.object({
  // 회사 정보 관리
  companyName: z.string().min(1, '기업명을 입력해 주세요.'),
  representative: z.string().min(1, '대표자명을 입력해 주세요.'),
  tel: z.string().min(1, '대표 전화번호를 입력해 주세요.'),
  fax: z.string().optional(),
  email: z.string().email('올바른 이메일 형식을 입력해 주세요.'),
  address: z.string().min(1, '주소를 입력해 주세요.'),
  businessNumber: z.string().optional(),
  industry: z.string().optional(),
  favicon: z
    .instanceof(File, { message: '파일을 선택해 주세요.' })
    .nullable()
    .optional(),

  // SEO 관리
  title: z.string().min(1, '사이트 제목을 입력해 주세요.'),
  description: z.string().min(1, '사이트 설명을 입력해 주세요.'),
  keywords: z.string().min(1, '키워드를 입력해 주세요.'),

  // Open Graph 관리
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z
    .instanceof(File, { message: '파일을 선택해 주세요.' })
    .nullable()
    .optional(),

  // Google Analytics 관리
  googleAnalyticsId: z.string().optional(),

  // 네이버 웹마스터 도구 관리
  naverWebmasterId: z.string().optional(),
})

export type SettingsFormSchemaType = z.infer<typeof settingFormSchema>
