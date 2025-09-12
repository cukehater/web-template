import { DropdownMenuItem } from '@cms/shared/ui/shadcn'
import { LucideIcon } from 'lucide-react'

interface ModalTriggerPropsType {
  icon: LucideIcon
  title: string
  onOpen: () => void
}

export default function ModalTrigger({ icon, title, onOpen }: ModalTriggerPropsType) {
  const Icon = icon
  return (
    <DropdownMenuItem onClick={onOpen}>
      <div className="flex items-center gap-2">
        <Icon className="size-4" />
        <p>{title}</p>
      </div>
    </DropdownMenuItem>
  )
}
