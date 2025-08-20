import { prisma } from '@/app/(cms)/_shared/lib'

import { SettingsFormSchemaType } from './model/schema'
import SettingsCards from './ui/settings-cards'

export default async function BasicSettingsPage() {
  const initialData = await prisma.settings.findUnique({
    where: {
      id: 'settings',
    },
  })

  return (
    <SettingsCards initialData={initialData as SettingsFormSchemaType | null} />
  )
}
