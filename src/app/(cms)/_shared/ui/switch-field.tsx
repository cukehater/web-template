import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { FormControl, FormDescription, FormLabel, Switch } from '../shadcn'

export default function SwitchField<T extends FieldValues>({
  field,
  label,
  activeDescription,
  inactiveDescription,
}: {
  field: ControllerRenderProps<T, Path<T>>
  label: string
  activeDescription: string
  inactiveDescription: string
}) {
  return (
    <div className='flex flex-row items-center justify-between p-3 rounded-lg border border-gray-200'>
      <div className='flex flex-col gap-2 flex-1'>
        <FormLabel>{label}</FormLabel>
        <FormDescription>
          {field.value ? activeDescription : inactiveDescription}
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={value => field.onChange(value)}
        />
      </FormControl>
    </div>
  )
}
