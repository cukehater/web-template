'use client'

import { Frown, Loader2, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(cms)/_shared/shadcn'

import { cn } from '../lib'
import {
  EditableTableColumn,
  EditableTableDialogColumn,
  EditableTableProps,
} from '../model'

export default function EditableTable<T extends Record<string, unknown>>({
  columns,
  data,
  dialogColumns,
  dialogDescription,
  dialogTitle,
  onSave,
  onDelete,
  idField = 'id' as keyof T,
  loading = false,
}: EditableTableProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<T>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEdit = (record: T) => {
    setEditingId(String(record[idField]))
    setEditData(record)
    setErrors({})
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!editingId) return

    const newErrors: Record<string, string> = {}
    dialogColumns.forEach(column => {
      if (column.validation) {
        const value = editData[column.key]
        const error = column.validation(value as T[keyof T], editData)
        if (error) {
          newErrors[String(column.key)] = error
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave?.(editingId, editData)
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    setEditingId(null)
    setEditData({})
    setErrors({})
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    onDelete?.(id)
  }

  const handleInputChange = (
    field: keyof T,
    value: string | number | boolean,
  ) => {
    setEditData(prev => ({ ...prev, [field]: value }))
    if (errors[String(field)]) {
      setErrors(prev => ({ ...prev, [String(field)]: '' }))
    }
  }

  const renderFormField = (column: EditableTableDialogColumn<T>) => {
    const value = editData[column.key] ?? ''
    const error = errors[String(column.key)]

    switch (column.type) {
      case 'switch':
        return (
          <div className='flex items-center space-x-2'>
            <Switch
              checked={value as boolean}
              className='cursor-pointer'
              id={String(column.key)}
              onCheckedChange={e => handleInputChange(column.key, e)}
            />
            <Label htmlFor={String(column.key)}>
              {value ? '팝업 노출' : '팝업 미노출'}
            </Label>
            {error && <p className='text-xs text-red-500'>{error}</p>}
          </div>
        )

      case 'image':
        return (
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>{column.title}</label>
            <Input
              type='file'
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => {
                    handleInputChange(column.key, reader?.result as string)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
            {value && (
              <Image
                alt='popup'
                className='rounded-md'
                height={100}
                src={value as string}
                width={100}
              />
            )}
            {error && <p className='text-xs text-red-500'>{error}</p>}
          </div>
        )

      case 'select':
        return (
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>{column.title}</label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={`${column.title} 선택해주세요.`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {column.options?.map(option => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <p className='text-xs text-red-500'>{error}</p>}
          </div>
        )

      case 'number':
        return (
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>{column.title}</label>
            <Input
              className='w-full'
              type='number'
              value={String(value)}
              onChange={e =>
                handleInputChange(column.key, Number(e.target.value))
              }
            />
            {error && <p className='text-xs text-red-500'>{error}</p>}
          </div>
        )

      case 'date':
        return (
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>{column.title}</label>
            <Input
              className='w-full'
              type='datetime-local'
              value={String(value)}
              onChange={e => handleInputChange(column.key, e.target.value)}
            />
            {error && <p className='text-xs text-red-500'>{error}</p>}
          </div>
        )

      case 'password':
        return (
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>{column.title}</label>
            <Input
              className='w-full'
              type='password'
              value={String(value)}
              onChange={e => handleInputChange(column.key, e.target.value)}
            />
            {error && <p className='text-xs text-red-500'>{error}</p>}
          </div>
        )

      default:
        return (
          <div className='grid gap-2'>
            <label className='text-sm font-medium'>{column.title}</label>
            <Input
              className='w-full'
              value={String(value)}
              onChange={e => handleInputChange(column.key, e.target.value)}
            />
            {error && <p className='text-xs text-red-500'>{error}</p>}
          </div>
        )
    }
  }

  const renderCell = (
    column: EditableTableColumn<T>,
    record: T,
    index: number,
  ) => {
    const value = record[column.key]

    if (column.render) {
      return column.render(value as T[keyof T], record, index)
    }

    return String(value)
  }

  return (
    <>
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
              <TableHead className='w-[100px] text-center'> </TableHead>
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
                    데이터를 불러오는 중입니다.
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
                    데이터가 없습니다.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((record, index) => (
                <TableRow key={String(record[idField])}>
                  {columns.map(column => (
                    <TableCell
                      key={String(column.key)}
                      style={{ width: column.width }}
                    >
                      {renderCell(column, record, index)}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className='h-8 w-8 p-0' variant='ghost'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={() => handleEdit(record)}>
                          <Pencil />
                          편집
                        </DropdownMenuItem>
                        {onDelete && (
                          <DropdownMenuItem
                            className='text-red-600'
                            onClick={() =>
                              handleDelete(String(record[idField]))
                            }
                          >
                            <Trash2 />
                            삭제
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>

          <DialogDescription>{dialogDescription}</DialogDescription>

          <form className='space-y-4 mt-2 grid grid-cols-2 gap-2'>
            {dialogColumns?.map(column => (
              <div
                key={String(column.key)}
                className={cn(
                  !column.isHalf && 'col-span-2',
                  column.type === 'date' && 'md:col-span-1 col-span-2',
                )}
              >
                {renderFormField(column)}
              </div>
            ))}
          </form>

          <DialogFooter>
            <Button variant='outline' onClick={handleCloseDialog}>
              취소
            </Button>
            <Button onClick={handleSave}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
