import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

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
  render?: (value: T[keyof T], record: T, index: number) => ReactNode
  editable?: boolean
  type?: 'text' | 'select' | 'date' | 'number' | 'password'
  options?: { label: string; value: string | number }[]
  validation?: (value: any, record: Partial<T>) => string | null
}

export interface EditableTableProps<T> {
  data: T[]
  columns: EditableTableColumn<T>[]
  onSave?: (id: string, updatedData: Partial<T>) => void
  onDelete?: (id: string) => void
  onAdd?: (newData: Omit<T, 'id'>) => void
  idField?: keyof T
  loading?: boolean
  title?: string
  showAddButton?: boolean
  addButtonText?: string
}

export interface DialogEditableTableProps<T> extends EditableTableProps<T> {
  dialogTitle?: string
  dialogColumns: EditableTableColumn<T>[]
}
