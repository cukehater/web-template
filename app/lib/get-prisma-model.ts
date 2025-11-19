import { prisma } from '@cms/shared/api'

import { PrismaModelType } from '@/models'

type TableNameType = 'gallery' | 'general'

type TableConfigType = {
  [K in TableNameType]: {
    model: PrismaModelType
  }
}

const TABLE_CONFIG: TableConfigType = {
  gallery: {
    model: prisma.gallery as unknown as PrismaModelType
  },
  general: {
    model: prisma.general as unknown as PrismaModelType
  }
}

export const validateTable = (table: string | null): table is TableNameType => {
  return table !== null && table in TABLE_CONFIG
}

export const getTableModel = (table: TableNameType): PrismaModelType => {
  return TABLE_CONFIG[table].model
}
