'use client'

import { Eye } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shadcn'

export default function TableRowsSelect({
  currentLimit,
}: {
  currentLimit: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 노출 개수 변경 함수
  const handleLimitChange = (limit: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', limit.toString())
    params.set('page', '1') // 노출 개수 변경 시 첫 페이지로 이동
    router.push(`?${params.toString()}`)
  }

  return (
    <div className='flex items-center gap-2 justify-end'>
      <div className='flex items-center gap-1'>
        <Eye className='size-4 text-muted-foreground' />
        <p className='text-sm text-muted-foreground'>노출 개수</p>
      </div>
      <Select
        value={currentLimit.toString()}
        onValueChange={value => handleLimitChange(parseInt(value))}
      >
        <SelectTrigger className='w-20'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
          <SelectItem value='50'>50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
