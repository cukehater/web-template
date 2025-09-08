import { Button, DialogTrigger } from '@cms/shared/shadcn'
import { KeyRound } from 'lucide-react'

import PasswordUpdateModal from './password-update-modal'

export default function PasswordUpdateTrigger({ id }: { id: string }) {
  return (
    <>
      <Button asChild size="icon" variant="ghost">
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2" size="icon" variant="outline">
            <KeyRound className="size-4" />
          </Button>
        </DialogTrigger>
      </Button>
      <PasswordUpdateModal id={id} />
    </>
  )
}
