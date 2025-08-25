import { z } from 'zod'

import { ALERT_MESSAGE, REGEX } from '@/app/(cms)/_shared/lib'

export const basicFormSchema = z.object({
  // 회사 정보
  companyName: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  representative: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  tel: z
    .string()
    .nonempty(ALERT_MESSAGE.NONE_EMPTY)
    .max(13, ALERT_MESSAGE.TELEPHONE)
    .regex(REGEX.TELEPHONE, ALERT_MESSAGE.TELEPHONE),
  fax: z.string().regex(REGEX.TELEPHONE, ALERT_MESSAGE.TELEPHONE).optional(),
  email: z
    .string()
    .nonempty(ALERT_MESSAGE.NONE_EMPTY)
    .email(ALERT_MESSAGE.EMAIL),
  address: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  businessNumber: z
    .string()
    .regex(REGEX.ONLY_NUMBER_AND_DASH, ALERT_MESSAGE.ONLY_NUMBER_AND_DASH)
    .optional(),
  industry: z.string().optional(),
  logo: z
    .union([z.instanceof(File, { message: ALERT_MESSAGE.FILE }), z.string()])
    .optional(),
  favicon: z
    .union([z.instanceof(File, { message: ALERT_MESSAGE.FILE }), z.string()])
    .optional(),

  // SEO
  title: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  description: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  keywords: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),

  // Open Graph
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z
    .union([z.instanceof(File, { message: ALERT_MESSAGE.FILE }), z.string()])
    .optional(),

  // Google Analytics
  googleAnalyticsId: z.string().optional(),

  // 네이버 웹마스터 도구
  naverWebmasterId: z.string().optional(),
})

export type BasicFormSchemaType = z.infer<typeof basicFormSchema>

export const initialBasicFormData: BasicFormSchemaType = {
  companyName: '',
  representative: '',
  tel: '',
  fax: undefined,
  email: '',
  address: '',
  businessNumber: undefined,
  industry: undefined,
  logo: undefined,
  favicon: undefined,
  title: '',
  description: '',
  keywords: '',
  ogTitle: undefined,
  ogDescription: undefined,
  ogImage: undefined,
  googleAnalyticsId: undefined,
  naverWebmasterId: undefined,
}
