import { prisma } from '@cms/shared/api'

export interface PrismaModelType {
  count: () => Promise<number>
  findUnique: (args?: {
    where?: { id: string }
  }) => Promise<{ id: string; order: number; [key: string]: unknown } | null>
  findMany: (args?: {
    orderBy?: { order: 'desc' | 'asc' }
    skip?: number
    take?: number
  }) => Promise<Array<{ id: string; order: number; isVisible?: boolean; [key: string]: unknown }>>
  findFirst: (args?: {
    orderBy?: { order: 'desc' | 'asc' }
    select?: { order: boolean }
    where?: { order?: { gt?: number } | number }
  }) => Promise<{ id: string; order: number; [key: string]: unknown } | null>
  create: (args: {
    data: Record<string, unknown>
  }) => Promise<{ id: string; [key: string]: unknown }>
  update: (args: {
    where: { id: string }
    data: Record<string, unknown>
  }) => Promise<{ id: string; [key: string]: unknown }>
  updateMany: (args: {
    where: { order: { gt: number } }
    data: { order: { decrement: number } }
  }) => Promise<{ count: number }>
  delete: (args: { where: { id: string } }) => Promise<{ id: string; [key: string]: unknown }>
}

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
