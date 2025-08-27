import { z } from 'zod'

import { ALERT_MESSAGE, REGEX } from '@/app/(cms)/shared/lib'

export const basicFormSchema = z.object({
  // 회사 정보
  companyName: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  representative: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  tel: z
    .string()
    .nonempty(ALERT_MESSAGE.NONE_EMPTY)
    .max(13, ALERT_MESSAGE.TELEPHONE)
    .regex(REGEX.TELEPHONE, ALERT_MESSAGE.TELEPHONE),
  fax: z.union([
    z.string().regex(REGEX.TELEPHONE, ALERT_MESSAGE.TELEPHONE),
    z.literal(''),
  ]),
  email: z
    .string()
    .nonempty(ALERT_MESSAGE.NONE_EMPTY)
    .email(ALERT_MESSAGE.EMAIL),
  address: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  businessNumber: z.union([
    z
      .string()
      .regex(REGEX.ONLY_NUMBER_AND_DASH, ALERT_MESSAGE.ONLY_NUMBER_AND_DASH),
    z.literal(''),
  ]),
  industry: z.string(),
  logo: z.union([
    z.instanceof(File, { message: ALERT_MESSAGE.FILE }),
    z.string(),
  ]),
  favicon: z.union([
    z.instanceof(File, { message: ALERT_MESSAGE.FILE }),
    z.string(),
  ]),

  // SEO
  title: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  description: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  keywords: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),

  // Open Graph
  ogTitle: z.string(),
  ogDescription: z.string(),
  ogImage: z.union([
    z.instanceof(File, { message: ALERT_MESSAGE.FILE }),
    z.string(),
  ]),

  // Google Analytics
  googleAnalyticsId: z.string(),

  // 네이버 웹마스터 도구
  naverWebmasterId: z.string(),
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
  naverWebmasterId: '',
}
