export default function PageTopTitle({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        {description && (
          <p className='text-sm text-muted-foreground mt-2'>{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
