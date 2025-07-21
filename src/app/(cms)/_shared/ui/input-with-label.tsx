import { Input, Label } from '../shadcn'

export default function InputWithLabel({ label }: { label: string }) {
  return (
    <div className='flex flex-col gap-2'>
      <Label>{label}</Label>
      <Input />
    </div>
  )
}
