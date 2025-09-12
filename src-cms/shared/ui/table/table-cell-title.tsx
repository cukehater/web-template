import { TableCell } from '../shadcn'

export default function TableCellTitle({ title }: { title: string }) {
  return (
    <TableCell>
      <h4 className="font-medium">{title}</h4>
    </TableCell>
  )
}
