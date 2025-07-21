export default function PageTopTitle({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      {children}
    </div>
  )
}
