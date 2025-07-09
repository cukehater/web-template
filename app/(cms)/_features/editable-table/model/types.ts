import { ReactNode } from 'react'

export interface EditableTableColumn<T> {
  key: keyof T
  title: string
  width?: string
  render?: (value: T[keyof T], record: T, index: number) => ReactNode
  editable?: boolean
  type?: 'text' | 'select' | 'date' | 'number'
  options?: { label: string; value: string | number }[]
  validation?: (value: any) => string | null
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
