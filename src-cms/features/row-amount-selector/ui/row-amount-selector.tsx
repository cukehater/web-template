'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@cms/shared/ui/shadcn'
import { Eye } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { RowAmountSelectorPropsType } from '../models/types'

export default function RowAmountSelector({ currentLimit }: RowAmountSelectorPropsType) {
  const searchParams = useSearchParams() as URLSearchParams
  const router = useRouter()

  const handleLimitChange = (limit: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', limit)
    params.set('page', '1')
    router.push(`?${params}`)
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      <div className="flex items-center gap-1">
        <Eye className="size-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">노출 개수</p>
      </div>
      <Select value={currentLimit} onValueChange={(value) => handleLimitChange(value)}>
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
