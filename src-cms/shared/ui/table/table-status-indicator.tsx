import { cn } from '../../lib'

export default function TableStatusIndicator({
  currentStatus,
  activeText,
  inactiveText,
}: {
  currentStatus: boolean
  activeText: string
  inactiveText: string
}) {
  return (
    <div className='text-center'>
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
          currentStatus
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200',
        )}
      >
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            currentStatus ? 'bg-green-500' : 'bg-red-500',
          )}
        />
        {currentStatus ? activeText : inactiveText}
      </div>
    </div>
  )
}
