import { Save } from 'lucide-react'

import { Button } from '@/app/(cms)/_shared/shadcn'
import { PageTopTitle } from '@/app/(cms)/_shared/ui'
import InputWithLabel from '@/app/(cms)/_shared/ui/input-with-label'

export default function AccountPage() {
  return (
    <section>
      <PageTopTitle
        description='웹사이트 기본 설정을 변경할 수 있습니다.'
        title='웹사이트 기본 설정'
      />

      <form>
        <div className='flex flex-col gap-4'>
          <InputWithLabel
            id='title'
            label='제목'
            placeholder='제목을 입력해 주세요.'
          />
          <InputWithLabel
            id='description'
            label='설명'
            placeholder='설명을 입력해 주세요.'
          />
          <InputWithLabel
            id='keywords'
            label='키워드'
            placeholder='키워드를 입력해 주세요.'
          />
          <InputWithLabel
            id='representative'
            label='대표자명'
            placeholder='대표자명을 입력해 주세요.'
          />
          <InputWithLabel
            id='phone'
            label='전화번호'
            placeholder='전화번호를 입력해 주세요.'
          />
          <InputWithLabel
            id='fax'
            label='팩스번호'
            placeholder='팩스번호를 입력해 주세요.'
          />
          <InputWithLabel
            id='address'
            label='주소'
            placeholder='주소를 입력해 주세요.'
          />
          <InputWithLabel
            id='email'
            label='이메일'
            placeholder='이메일을 입력해 주세요.'
            type='email'
          />
          <InputWithLabel id='og-image' label='OG 이미지' type='file' />
        </div>

        <Button className='mt-4 ml-auto flex'>
          <Save />
          <p>저장하기</p>
        </Button>
      </form>
    </section>
  )
}
