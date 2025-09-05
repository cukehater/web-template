import { User } from '@prisma/client'

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
export type AccountType = Pick<User, 'userId' | 'name' | 'createdAt'>

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
