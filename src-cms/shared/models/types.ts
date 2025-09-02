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

export interface PaginationType {
  page: number
  limit: number
  total: number
  totalPages: number
}
