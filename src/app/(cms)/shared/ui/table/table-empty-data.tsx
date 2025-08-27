import { CloudAlert } from 'lucide-react'

import { TableCell, TableRow } from '../../shadcn'

export default function TableEmptyData({ colSpan }: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <div className='flex items-center justify-center gap-2 py-10 text-muted-foreground'>
          <CloudAlert className='size-6' strokeWidth={1.5} />
          데이터가 없습니다.
        </div>
      </TableCell>
    </TableRow>
  )
}
