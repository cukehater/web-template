import { Facebook, Save, Settings2 } from 'lucide-react'

import { Button } from '@/app/(cms)/_shared/shadcn'
import {
  FormContainer,
  InputWithLabel,
  PageTopTitle,
} from '@/app/(cms)/_shared/ui'

export default function BasicSettingsPage() {
  return (
    <section>
      <form className='space-y-6'>
        <PageTopTitle title='사이트 기본 설정'>
          <Button className='px-6 py-2 text-white'>
            <Save className='w-4 h-4 mr-2' />
            저장하기
          </Button>
        </PageTopTitle>

        <FormContainer
          title={
            <>
              <Settings2 className='w-5 h-5' />
              <p>기본 정보</p>
            </>
          }
        >
          <InputWithLabel
            required
            label='회사명'
            name='companyName'
            placeholder='회사명을 입력해 주세요.'
          />
          <InputWithLabel
            required
            label='사이트 제목'
            name='title'
            placeholder='사이트 제목을 입력해 주세요.'
          />
          <InputWithLabel
            required
            label='사이트 설명'
            name='description'
            placeholder='사이트 설명을 입력해 주세요.'
          />
          <InputWithLabel
            required
            label='키워드'
            name='keywords'
            placeholder='키워드를 쉼표로 구분하여 입력해 주세요.'
          />
          <InputWithLabel
            required
            label='대표자명'
            name='representative'
            placeholder='대표자명을 입력해 주세요.'
          />
          <InputWithLabel
            required
            label='대표 전화번호'
            name='tel'
            placeholder='대표 전화번호를 입력해 주세요.'
            type='tel'
          />
          <InputWithLabel
            label='팩스번호'
            name='fax'
            placeholder='팩스번호를 입력해 주세요.'
            type='email'
          />
          <InputWithLabel
            required
            label='대표 이메일'
            name='email'
            placeholder='대표 이메일을 입력해 주세요.'
            type='email'
          />
          <InputWithLabel
            required
            label='주소'
            name='address'
            placeholder='대표 주소를 입력해 주세요.'
          />
          <InputWithLabel
            label='사업자등록번호'
            name='businessNumber'
            placeholder='사업자등록번호를 입력해 주세요.'
          />
          <InputWithLabel
            label='업종'
            name='industry'
            placeholder='업종을 입력해 주세요.'
          />
          <InputWithLabel label='파비콘' name='favicon' type='file' />
        </FormContainer>

        <FormContainer
          title={
            <>
              <Facebook className='w-5 h-5' />
              <p>오픈 그래프</p>
            </>
          }
        >
          <InputWithLabel
            label='제목'
            name='og-title'
            placeholder='오픈 그래프 제목을 입력해 주세요.'
            type='text'
          />
          <InputWithLabel
            label='설명'
            name='og-description'
            placeholder='오픈 그래프 설명을 입력해 주세요.'
            type='text'
          />
          <InputWithLabel label='이미지' name='og-image' type='file' />
        </FormContainer>
      </form>
    </section>
  )
}
