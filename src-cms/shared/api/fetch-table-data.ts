import { apiGet } from '@cms/shared/api'

import { RowAmountLimitType } from '../models'

interface FetchTableDataPropsType {
  table: string
  page: string
  limit: RowAmountLimitType
}

export async function fetchTableData<T>({ table, page, limit }: FetchTableDataPropsType) {
  const { data } = await apiGet<T>(`/api/post?table=${table}&page=${page}&limit=${limit}`)
  return data
}
