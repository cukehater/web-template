import { ALERT_MESSAGE } from '@cms/shared/lib'
import { z } from 'zod'

export const galleryFormSchema = z.object({
  title: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  thumbnail: z.union([
    z.string(),
    z.instanceof(File, { message: ALERT_MESSAGE.FILE }),
  ]),
  createdAt: z.union([z.date(), z.literal('')]),
  content: z.string().nonempty(ALERT_MESSAGE.NONE_EMPTY),
  isVisible: z.boolean(),
})

export type GalleryFormSchemaType = z.infer<typeof galleryFormSchema>

export const initialGalleryFormData: GalleryFormSchemaType = {
  title: '',
  thumbnail: '',
  createdAt: '',
  content: '',
  isVisible: true,
}
