import { z } from 'zod'

import { settingsSchema } from './schema'

export type SettingForm = z.infer<typeof settingsSchema>
