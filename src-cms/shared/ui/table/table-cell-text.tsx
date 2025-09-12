import { TableCell } from '../shadcn'

export default function TableCellText({ text }: { text: string }) {
  return (
    <TableCell>
      <p className="text-center">{text}</p>
    </TableCell>
  )
}
