import { ALERT_MESSAGES } from '@cms/shared/lib'
import { z } from 'zod'

export const galleryFormSchema = z.object({
  title: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  thumbnail: z.union([z.string(), z.instanceof(File, { message: ALERT_MESSAGES.FILE })]),
  writer: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  content: z.string().nonempty(ALERT_MESSAGES.NONE_EMPTY),
  isVisible: z.boolean(),
  createdAt: z.union([z.date(), z.literal('')])
})

export type GalleryFormSchemaType = z.infer<typeof galleryFormSchema>

export const initialGalleryFormData: GalleryFormSchemaType = {
  title: '',
  thumbnail: '',
  content: '',
  writer: '',
  isVisible: true,
  createdAt: ''
}
