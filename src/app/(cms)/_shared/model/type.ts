import { LucideIcon } from 'lucide-react'

export interface MenuItemType {
  title: string
  icon?: LucideIcon
  url?: string
  items?: MenuItemType[]
}

export interface User {
  userId: string
  name: string
}

export interface EditableTableColumn<T> {
  key: keyof T
  title: string
  width?: string
  render?: (value: T[keyof T], record: T, index: number) => React.ReactElement
}

export interface EditableTableDialogColumn<T> {
  key: keyof T
  title: string
  type:
    | 'text'
    | 'select'
    | 'date'
    | 'number'
    | 'password'
    | 'checkbox'
    | 'switch'
    | 'image'
  options?: { label: string; value: string | number }[]
  validation?: (value: T[keyof T], record: Partial<T>) => string | null
  isHalf?: boolean
}

export interface EditableTableProps<T> {
  data: T[]
  columns: EditableTableColumn<T>[]
  onSave?: (id: string, updatedData: Partial<T>) => void
  onDelete?: (id: string) => void
  idField?: keyof T
  loading?: boolean
  dialogTitle: string
  dialogColumns: EditableTableDialogColumn<T>[]
  dialogDescription: string
}
