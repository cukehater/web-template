import { ALERT_MESSAGES, REGEX } from '@cms/shared/lib'
import { z } from 'zod'

export const basicFormSchema = z.object({
  // 회사 정보
  companyName: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  representative: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  tel: z
    .string()
    .nonempty(ALERT_MESSAGES.NONE_EMPTY)
    .max(13, ALERT_MESSAGES.TELEPHONE)
    .regex(REGEX.TELEPHONE, ALERT_MESSAGES.TELEPHONE),
  fax: z.union([z.string().regex(REGEX.TELEPHONE, ALERT_MESSAGES.TELEPHONE), z.literal('')]),
  email: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY).email(ALERT_MESSAGES.EMAIL),
  address: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  businessNumber: z.union([
    z.string().regex(REGEX.ONLY_NUMBER_AND_DASH, ALERT_MESSAGES.ONLY_NUMBER_AND_DASH),
    z.literal('')
  ]),
  industry: z.string(),
  logo: z.union([z.instanceof(File, { message: ALERT_MESSAGES.FILE }), z.string()]),
  favicon: z.union([z.instanceof(File, { message: ALERT_MESSAGES.FILE }), z.string()]),

  // SEO
  title: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  description: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  keywords: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),

  // Open Graph
  ogTitle: z.string(),
  ogDescription: z.string(),
  ogImage: z.union([z.instanceof(File, { message: ALERT_MESSAGES.FILE }), z.string()]),

  // Google Analytics
  googleAnalyticsId: z.string(),

  // 네이버 웹마스터 도구
  naverWebmasterId: z.string()
})

export type BasicFormSchemaType = z.infer<typeof basicFormSchema>

export const initialBasicFormData: BasicFormSchemaType = {
  companyName: '',
  representative: '',
  tel: '',
  fax: '',
  email: '',
  address: '',
  businessNumber: '',
  industry: '',
  logo: '',
  favicon: '',
  title: '',
  description: '',
  keywords: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  googleAnalyticsId: '',
  naverWebmasterId: ''
}
