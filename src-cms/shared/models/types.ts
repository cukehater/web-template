import { Account } from '@prisma/client'

// Prisma 모델의 공통 메서드들을 정의하는 타입
export interface PrismaModelType {
  count: () => Promise<number>
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

// API 성공/실패 응답 타입
interface ApiSuccessResponseType<T> {
  data?: T
  message: string
  ok: true
}

interface ApiErrorResponseType {
  message: string
  ok: false
}

export type ApiResponseType<T> = ApiSuccessResponseType<T> | ApiErrorResponseType

// 파일 업로드 응답 타입
export interface UploadResponseType {
  [key: string]: string
}

// 계정 타입
export type AccountType = Pick<Account, 'id' | 'accountId' | 'name' | 'createdAt'>

// 행 개수 선택기 타입
export type RowAmountLimitType = '10' | '20' | '50'

export interface TableSearchParamsType {
  searchParams: Promise<{
    page: string
    limit: string
  }>
}

// 전체 테이블 목록 응답 타입
export interface TableDataResponseType<T> {
  data: T[]
  pagination: PaginationType
}

export interface TableListPropsType<T> {
  initialData: T[]
  pagination: PaginationType
  currentPage: string
  currentLimit: RowAmountLimitType
}

// 페이지네이션 타입
export interface PaginationType {
  page: number
  limit: number
  total: number
  totalPages: number
}
