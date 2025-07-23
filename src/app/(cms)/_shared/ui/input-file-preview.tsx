import Image from 'next/image'

export default function InputFilePreview({ file }: { file: File | null }) {
  return (
    <div className='flex items-center gap-2 w-full ml-28'>
      <Image
        alt='preview'
        className='object-cover'
        height={240}
        src={file ? URL.createObjectURL(file) : ''}
        width={240}
      />
    </div>
  )
}
