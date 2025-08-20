import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { settingFormSchema, SettingsFormSchemaType } from './schema'

export function useSettingForm() {
  const form = useForm<SettingsFormSchemaType>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: {
      companyName: '',
      representative: '',
      tel: '',
      fax: '',
      email: '',
      address: '',
      businessNumber: '',
      industry: '',
      favicon: null,
      title: '',
      description: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: null,
      googleAnalyticsId: '',
      naverWebmasterId: '',
    },
  })

  async function onSubmit(values: SettingsFormSchemaType) {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      toast.error('설정 저장에 실패했습니다.', {
        position: 'top-right',
        richColors: true,
      })

      return
    }

    toast.success('설정을 성공적으로 저장했습니다.', {
      position: 'top-right',
      richColors: true,
    })
  }

  return { form, onSubmit }
}
