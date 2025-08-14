import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { settingsSchema } from './schema'
import { SettingForm } from './type'

export function useSettingForm() {
  const form = useForm<SettingForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: '',
      representative: '',
      tel: '',
      fax: '',
      email: '',
      address: '',
      businessNumber: '',
      industry: '',
      title: '',
      description: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      googleAnalyticsId: '',
      naverWebmasterId: '',
    },
  })

  function onSubmit(values: SettingForm) {
    // TODO: API 호출 로직 추가
  }

  return { form, onSubmit }
}
