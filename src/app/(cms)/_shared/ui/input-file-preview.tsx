export default function InputFilePreview({ file }: { file: File | null }) {
  return (
    <div className='flex items-center gap-2 w-full ml-24'>
      <img
        alt='preview'
        className='w-60 object-cover'
        src={file ? URL.createObjectURL(file) : ''}
      />
    </div>
  )
}
