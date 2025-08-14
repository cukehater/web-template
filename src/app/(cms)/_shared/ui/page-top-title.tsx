export default function PageTopTitle({
  title,
  icon,
  description,
  children,
}: {
  title: string
  icon?: React.ReactNode
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-2xl font-semibold flex items-center gap-2'>
          {icon}
          {title}
        </h2>
        {description && (
          <p className='text-sm text-muted-foreground mt-2'>{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
