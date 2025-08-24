'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useCallback, useId, useState } from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import {
  Button,
  Calendar,
  Checkbox,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/(cms)/_shared/shadcn'

export default function DateTimePicker<T extends FieldValues>({
  field,
}: {
  field: ControllerRenderProps<T, Path<T>>
}) {
  const id = useId()
  const [isCustom, setIsCustom] = useState(false)
  const [date, setDate] = useState<Date | string>('')
  const [open, setOpen] = useState(false)

  const handleDateSelect = useCallback(
    (selectedDate: Date | undefined) => {
      if (!selectedDate) return

      setDate(selectedDate)
      setOpen(false)
      field.onChange(selectedDate)
    },
    [field],
  )

  const handleTimeChange = useCallback(
    (timeValue: string) => {
      if (!date) return

      const newDate = new Date(new Date(date).toDateString() + ' ' + timeValue)
      setDate(newDate)
      field.onChange(newDate)
    },
    [date, field],
  )

  const handleCheckboxChange = useCallback(
    (checked: boolean | 'indeterminate') => {
      const isChecked = checked === 'indeterminate' ? false : checked
      setIsCustom(isChecked)

      if (!isChecked) {
        setDate('')
        field.onChange('')
      }
    },
    [field],
  )

  const getDateDisplayText = () => {
    return date instanceof Date ? date.toLocaleDateString() : '날짜 선택'
  }

  const getTimeDefaultValue = () => {
    return date ? new Date(date).toTimeString().slice(0, 8) : ''
  }

  return (
    <div className='space-y-2'>
      <div className='flex gap-2'>
        <div className='flex flex-col gap-3'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                className='w-32 justify-between font-normal'
                disabled={!isCustom}
                id='date-picker'
                variant='outline'
              >
                {getDateDisplayText()}
                <ChevronDownIcon className='h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              className='w-auto overflow-hidden p-0'
            >
              <Calendar
                captionLayout='dropdown'
                mode='single'
                selected={date === '' ? undefined : new Date(date)}
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className='flex flex-col gap-3'>
          <Input
            className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden'
            disabled={!isCustom}
            id='time-picker'
            step='1'
            type='time'
            value={getTimeDefaultValue()}
            onChange={e => handleTimeChange(e.target.value)}
          />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          checked={isCustom}
          id={id}
          onCheckedChange={handleCheckboxChange}
        />
        <Label className='cursor-pointer text-muted-foreground' htmlFor={id}>
          날짜 직접 입력하기
        </Label>
      </div>
    </div>
  )
}
