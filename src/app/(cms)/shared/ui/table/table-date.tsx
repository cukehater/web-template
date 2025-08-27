import { formatDate } from 'date-fns'
import { Calendar } from 'lucide-react'

export default function TableDate({ date }: { date: Date }) {
  return (
    <div className='flex gap-1 items-center justify-center'>
      <Calendar className='size-3 text-muted-foreground' />
      <span className='text-xs text-muted-foreground'>
        {formatDate(date, 'yyyy.MM.dd')}
      </span>
    </div>
  )
}
