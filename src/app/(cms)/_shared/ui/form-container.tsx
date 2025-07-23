export default function FormContainer({
  children,
  title,
}: {
  children: React.ReactNode
  title: React.ReactNode
}) {
  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6'>
      <h3 className='flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900'>
        {title}
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
        {children}
      </div>
    </div>
  )
}
