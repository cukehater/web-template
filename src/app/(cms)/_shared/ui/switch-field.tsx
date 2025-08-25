import { Label, Switch } from '../shadcn'

export default function SwitchField({
  checked,
  onCheckedChange,
  label,
  activeDescription,
  inactiveDescription,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
  activeDescription: string
  inactiveDescription: string
}) {
  return (
    <Label className='hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950 cursor-pointer'>
      <div className='flex flex-col gap-1.5 flex-1'>
        <p className='text-sm font-medium'>{label}</p>
        <p className='text-xs text-muted-foreground'>
          {checked ? activeDescription : inactiveDescription}
        </p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </Label>
  )
}
