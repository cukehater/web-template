import { Save } from 'lucide-react'

import { Button } from '@/app/(cms)/_shared/shadcn'
import { PageTopTitle } from '@/app/(cms)/_shared/ui'
import InputWithLabel from '@/app/(cms)/_shared/ui/input-with-label'

export default function AccountPage() {
  return (
    <>
      <PageTopTitle title='웹사이트 기본 설정' />

      <form>
        <div className='flex flex-col gap-4'>
          <InputWithLabel label='제목' />
          <InputWithLabel label='설명' />
          <InputWithLabel label='키워드' />
          <InputWithLabel label='대표자명' />
          <InputWithLabel label='전화번호' />
          <InputWithLabel label='팩스번호' />
          <InputWithLabel label='주소' />
          <InputWithLabel label='이메일' />
        </div>

        <Button className='mt-4 ml-auto flex'>
          <Save />
          <p>저장하기</p>
        </Button>
      </form>
    </>
  )
}
