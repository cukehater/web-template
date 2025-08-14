'use client'

import {
  Frown,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@//app/(cms)/_shared/shadcn'
import { Input } from '@//app/(cms)/_shared/shadcn'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@//app/(cms)/_shared/shadcn'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@//app/(cms)/_shared/shadcn'

import { EditableTableColumn, EditableTableProps } from '../model'
import PageTopTitle from './page-top-title'

export default function EditableTable<T extends Record<string, any>>({
  data,
  columns,
  onSave,
  onDelete,
  onAdd,
  idField = 'id' as keyof T,
  loading = false,
  title,
  showAddButton = false,
  addButtonText = '추가',
}: EditableTableProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<T>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleEdit = (record: T) => {
    setEditingId(String(record[idField]))
    setEditData(record)
    setErrors({})
  }

  const handleSave = (id: string) => {
    // 유효성 검사
    const newErrors: Record<string, string> = {}
    columns.forEach(column => {
      if (column.validation && column.editable) {
        const value = editData[column.key]
        const error = column.validation(value, editData)
        if (error) {
          newErrors[String(column.key)] = error
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave?.(id, editData)
    setEditingId(null)
    setEditData({})
    setErrors({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
    setErrors({})
  }

  const handleDelete = (id: string) => {
    onDelete?.(id)
  }

  const handleInputChange = (field: keyof T, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }))
    // 에러 제거
    if (errors[String(field)]) {
      setErrors(prev => ({ ...prev, [String(field)]: '' }))
    }
  }

  const renderCell = (
    column: EditableTableColumn<T>,
    record: T,
    index: number,
  ) => {
    const isEditing = editingId === String(record[idField])
    const value = isEditing ? editData[column.key] : record[column.key]
    const error = errors[String(column.key)]

    if (isEditing && column.editable) {
      switch (column.type) {
        case 'select':
          return (
            <div className='space-y-1'>
              <select
                className='w-full p-2 border rounded-md'
                value={value || ''}
                onChange={e => handleInputChange(column.key, e.target.value)}
              >
                {column.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {error && <p className='text-xs text-red-500'>{error}</p>}
            </div>
          )

        case 'number':
          return (
            <div className='space-y-1'>
              <Input
                className='w-full'
                type='number'
                value={value || ''}
                onChange={e =>
                  handleInputChange(column.key, Number(e.target.value))
                }
              />
              {error && <p className='text-xs text-red-500'>{error}</p>}
            </div>
          )

        case 'date':
          return (
            <div className='space-y-1'>
              <Input
                className='w-full'
                type='date'
                value={value || ''}
                onChange={e => handleInputChange(column.key, e.target.value)}
              />
              {error && <p className='text-xs text-red-500'>{error}</p>}
            </div>
          )

        default:
          return (
            <div className='space-y-1'>
              <Input
                className='w-full'
                value={value || ''}
                onChange={e => handleInputChange(column.key, e.target.value)}
              />
              {error && <p className='text-xs text-red-500'>{error}</p>}
            </div>
          )
      }
    }

    // 기본 렌더링
    if (column.render) {
      return column.render(value as T[keyof T], record, index)
    }

    return <span>{String(value || '')}</span>
  }

  return (
    <>
      {(title || showAddButton) && (
        <PageTopTitle title={title ?? ''}>
          {showAddButton && onAdd && (
            <Button onClick={() => onAdd({} as Omit<T, 'id'>)}>
              <Plus className='mr-2 h-4 w-4' />
              {addButtonText}
            </Button>
          )}
        </PageTopTitle>
      )}

      <div className='rounded-md border text-center'>
        <Table>
          <TableHeader className='bg-neutral-100'>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={String(column.key)}
                  className='text-center'
                  style={{ width: column.width }}
                >
                  {column.title}
                </TableHead>
              ))}
              <TableHead className='w-[100px] text-center'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? (
              <TableRow>
                <TableCell
                  className='text-center py-8'
                  colSpan={columns.length + 1}
                >
                  <div className='flex items-center justify-center gap-2'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  className='text-center py-8'
                  colSpan={columns.length + 1}
                >
                  <div className='flex items-center justify-center gap-2'>
                    <Frown className='h-4 w-4' />
                    데이터가 없습니다
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((record, index) => {
                const isEditing = editingId === String(record[idField])

                return (
                  <TableRow key={String(record[idField])}>
                    {columns.map(column => (
                      <TableCell key={String(column.key)}>
                        {renderCell(column, record, index)}
                      </TableCell>
                    ))}
                    <TableCell>
                      {isEditing ? (
                        <div className='flex gap-1'>
                          <Button
                            className='h-8 w-8 p-0'
                            size='sm'
                            variant='outline'
                            onClick={() => handleSave(String(record[idField]))}
                          >
                            <Save className='h-4 w-4' />
                          </Button>
                          <Button
                            className='h-8 w-8 p-0'
                            size='sm'
                            variant='outline'
                            onClick={handleCancel}
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className='h-8 w-8 p-0' variant='ghost'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            {columns.some(col => col.editable) && (
                              <DropdownMenuItem
                                onClick={() => handleEdit(record)}
                              >
                                <Pencil className='mr-2 h-4 w-4' />
                                편집
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <DropdownMenuItem
                                className='text-red-600'
                                onClick={() =>
                                  handleDelete(String(record[idField]))
                                }
                              >
                                <Trash2 className='mr-2 h-4 w-4' />
                                삭제
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
