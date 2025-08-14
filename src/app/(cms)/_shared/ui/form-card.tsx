export default function FormCard({
  children,
  icon,
  title,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm break-inside-avoid mb-6'>
      <div className='flex items-center gap-2 mb-6'>
        {icon}
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
      </div>
      {children}
    </div>
  )
}
