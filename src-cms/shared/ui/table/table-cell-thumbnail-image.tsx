import { EyeOff, Image } from 'lucide-react'

import { TableCell } from '../shadcn'

export default function TableCellThumbnailImage({
  thumbnail,
  alt,
  visibleStatus
}: {
  thumbnail: string
  alt: string
  visibleStatus: boolean
}) {
  return (
    <TableCell>
      <div className="relative rounded-md overflow-hidden border border-gray-200">
        {thumbnail ? (
          <img alt={alt} className="w-full aspect-square object-cover" src={thumbnail} />
        ) : (
          <div className="w-full aspect-square bg-gray-100 rounded-md flex items-center justify-center">
            <Image className="size-6 font-light text-gray-400" strokeWidth={1.5} />
          </div>
        )}
        {!visibleStatus && (
          <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
            <EyeOff className="size-4 text-white" />
          </div>
        )}
      </div>
    </TableCell>
  )
}
