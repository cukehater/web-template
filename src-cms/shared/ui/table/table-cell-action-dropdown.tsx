import { Eye, EyeOff, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TableCell
} from '../../shadcn'

interface TableCellActionDropdownPropsType {
  disabled?: boolean
  onToggleVisible?: () => void
  visibleStatus?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export default function TableCellActionDropdown({
  disabled,
  onToggleVisible,
  visibleStatus,
  onEdit,
  onDelete
}: TableCellActionDropdownPropsType) {
  return (
    <TableCell>
      <div className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" disabled={disabled} variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border bg-white rounded-md">
            {onToggleVisible && (
              <DropdownMenuItem onClick={onToggleVisible}>
                {visibleStatus ? (
                  <>
                    <EyeOff className="size-4" />
                    비활성화
                  </>
                ) : (
                  <>
                    <Eye className="size-4" />
                    활성화
                  </>
                )}
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem onClick={onEdit}>
                <SquarePen />
                편집
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem className="text-red-600" onClick={onDelete}>
                <Trash2 />
                삭제
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  )
}
