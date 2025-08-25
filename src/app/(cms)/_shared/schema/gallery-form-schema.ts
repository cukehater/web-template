import { z } from 'zod'

import { ALERT_MESSAGE } from '../lib'

export const galleryFormSchema = z.object({
  title: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  thumbnail: z.union([z.string(), z.instanceof(File)]),
  createdAt: z.union([z.date(), z.string()]),
  content: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  isVisible: z.boolean(),
})

export type GalleryFormSchemaType = z.infer<typeof galleryFormSchema>
