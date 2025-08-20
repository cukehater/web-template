import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import {
  ALERT_MESSAGE,
  ALLOWED_TYPES,
  errorToast,
  successToast,
} from '@/app/(cms)/_shared/lib'

import { basicFormSchema, BasicFormSchemaType } from './schema'

export function useBasicForm() {
  const router = useRouter()
  const form = useForm<BasicFormSchemaType>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
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
    },
  })

  async function onSubmit(values: BasicFormSchemaType) {
    try {
      const fileKeys = ['logo', 'favicon', 'ogImage']
      const fileFormData = new FormData()

      for (const [key, value] of Object.entries(values)) {
        if (fileKeys.includes(key)) {
          fileFormData.append(key, value || '')
        }
      }

      for (const [key, value] of Array.from(fileFormData)) {
        if (!value || typeof value === 'string') continue

        // 파일 형식 제한
        if (
          !(value instanceof File) ||
          !ALLOWED_TYPES.IMAGE.includes(value.type)
        ) {
          errorToast(ALERT_MESSAGE.FILE_FORMAT)
          return
        }

        // 로고 파일 크기 제한
        if (key === 'logo' && value.size > 1024 * 1024) {
          errorToast(`로고 ${ALERT_MESSAGE.FILE_SIZE} (1MB)`)
          return
        }

        // 파비콘 파일 크기 제한
        if (key === 'favicon' && value.size > 1024 * 32) {
          errorToast(`파비콘 ${ALERT_MESSAGE.FILE_SIZE} (32KB)`)
          return
        }

        // 오픈그래프 이미지 파일 크기 제한
        if (key === 'ogImage' && value.size > 1024 * 1024) {
          errorToast(`오픈그래프 이미지 ${ALERT_MESSAGE.FILE_SIZE} (1MB)`)
          return
        }
      }

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: fileFormData,
      })

      if (!uploadRes.ok) {
        const errorMessage = await uploadRes.json()
        errorToast(errorMessage || ALERT_MESSAGE.SERVER_ERROR)
        return
      }

      const uploadImageValues = await uploadRes.json()

      const res = await fetch('/api/basic', {
        method: 'POST',
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          ...uploadImageValues,
        }),
      })

      if (!res.ok) {
        errorToast(ALERT_MESSAGE.SAVE_ERROR)
        return
      }

      successToast(ALERT_MESSAGE.SAVE_SUCCESS)
      router.refresh()
    } catch {
      errorToast(ALERT_MESSAGE.SERVER_ERROR)
      return
    }
  }

  return { form, onSubmit }
}
