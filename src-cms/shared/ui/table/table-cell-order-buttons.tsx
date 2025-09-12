import { ChevronDown, ChevronUp } from 'lucide-react'

import { Button, TableCell } from '../shadcn'

export default function TableCellOrderButtons({
  onOrderChangeUp,
  onOrderChangeDown
}: {
  onOrderChangeUp: () => void
  onOrderChangeDown: () => void
}) {
  return (
    <TableCell>
      <div className="flex flex-col items-center gap-2">
        <Button className="p-1" size={null} variant="outline" onClick={onOrderChangeUp}>
          <ChevronUp className="size-3" />
        </Button>

        <Button className="p-1" size={null} variant="outline" onClick={onOrderChangeDown}>
          <ChevronDown className="size-3" />
        </Button>
      </div>
    </TableCell>
  )
}
