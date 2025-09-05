import { TableCell } from '../../shadcn'

export default function TableCellNumberText({ text }: { text: string }) {
  return (
    <TableCell>
      <p className="text-center text-muted-foreground">{text}</p>
    </TableCell>
  )
}
