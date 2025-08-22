'use client'

import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ALERT_MESSAGE } from '@/app/(cms)/_shared/lib'
import { AlertDialog, Button } from '@/app/(cms)/_shared/shadcn'
import { ConfirmDialog, PageTopTitle } from '@/app/(cms)/_shared/ui'

export default function GalleryCreatePage() {
  const router = useRouter()

  const handleSubmit = () => {}
  const handleCancel = () => {
    router.push('/admin/templates/gallery')
  }

  return (
    <AlertDialog>
      <PageTopTitle
        description='갤러리 게시글 작성합니다.'
        title='갤러리 게시글 작성'
      >
        <div className='flex gap-2'>
          <Button onClick={handleSubmit}>
            <Save className='size-4' /> 작성 완료
          </Button>
          <AlertDialogTrigger asChild>
            <Button variant='outline'>
              <X className='size-4' /> 취소
            </Button>
          </AlertDialogTrigger>
        </div>
      </PageTopTitle>

      <ConfirmDialog
        description={ALERT_MESSAGE.CANCEL_DESCRIPTION}
        title={ALERT_MESSAGE.CANCEL}
        onConfirm={handleCancel}
      />
    </AlertDialog>
  )
}
