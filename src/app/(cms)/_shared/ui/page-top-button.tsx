import { Pencil, Plus, Save, Trash2 } from 'lucide-react'

import { Button } from '../shadcn'

type ButtonType = 'add' | 'edit' | 'delete' | 'save'

export default function PageTopButton({
  type,
  text,
  variant = 'default',
}: {
  type: ButtonType
  text: string
  variant?: 'default' | 'outline' | 'ghost' | 'link'
}) {
  const buttonType = {
    add: Plus,
    edit: Pencil,
    delete: Trash2,
    save: Save,
  }

  const ButtonIcon = buttonType[type]
  return (
    <Button className='flex items-center gap-2' variant={variant}>
      <ButtonIcon />
      <p>{text}</p>
    </Button>
  )
}
