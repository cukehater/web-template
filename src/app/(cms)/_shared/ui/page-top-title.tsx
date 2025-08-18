export default function PageTopTitle({
  title,
  icon,
  description,
  children,
}: {
  title: string
  icon: React.ReactNode
  description: string
  children?: React.ReactNode
}) {
  return (
    <div className='flex justify-between md:items-center mb-2 flex-col md:flex-row'>
      <div className='mb-2 md:mb-0'>
        <h2 className='text-2xl font-semibold flex items-center gap-2'>
          <span>{icon}</span>
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
