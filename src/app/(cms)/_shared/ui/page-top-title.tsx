import { LucideIcon } from 'lucide-react'
import React from 'react'

export default function PageTopTitle({
  title,
  icon,
  description,
  children,
}: {
  title: string
  icon: LucideIcon
  description: string
  children?: React.ReactNode
}) {
  const Icon = icon
  return (
    <div className='flex justify-between md:items-center mb-2 flex-col md:flex-row'>
      <div className='mb-2 md:mb-0'>
        <h2 className='text-2xl font-semibold flex items-center gap-2'>
          <Icon className='size-6' />
          <span>{title}</span>
        </h2>
        {description && (
          <p className='text-sm text-muted-foreground mt-2'>{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
