import { ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '../../shadcn'

export default function TableOrderButtons({
  onOrderChangeUp,
  onOrderChangeDown
}: {
  onOrderChangeUp: () => void
  onOrderChangeDown: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button className="p-1" size={null} variant="outline" onClick={onOrderChangeUp}>
        <ChevronUp className="size-3" />
      </Button>

      <Button className="p-1" size={null} variant="outline" onClick={onOrderChangeDown}>
        <ChevronDown className="size-3" />
      </Button>
    </div>
  )
}
