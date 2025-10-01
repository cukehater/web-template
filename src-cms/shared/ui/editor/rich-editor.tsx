import 'md-editor-rt/lib/style.css'

import { apiPost } from '@cms/shared/api'
import { ALERT_MESSAGES, errorToast } from '@cms/shared/lib'
import { ApiResponseType, UploadResponseType } from '@cms/shared/models'
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR'
import { config, MdEditor } from 'md-editor-rt'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR
    }
  }
})

export default function RichEditor<T extends FieldValues>({
  field
}: {
  field: ControllerRenderProps<T, Path<T>>
}) {
  const handleUploadImages = async (files: File[], callback: (urls: string[]) => void) => {
    try {
      const formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        formData.append(`file${i}`, files[i])
        if (files[i].size > 1024 * 1024) {
          throw new Error(ALERT_MESSAGES.FILE_SIZE)
        }
      }

      const result = (await apiPost('/api/upload', formData)) as ApiResponseType<UploadResponseType>

      if (!result.ok) {
        errorToast(result.message)
        return
      }

      const urls = Object.values(result?.data as UploadResponseType)
      callback(urls)
    } catch (error) {
      errorToast(error instanceof Error ? error.message : ALERT_MESSAGES.REQUEST_ERROR)
    }
  }

  return (
    <MdEditor
      language="ko-KR"
      placeholder="내용을 입력해주세요."
      previewTheme="github"
      value={field.value}
      onChange={(value) => field.onChange(value)}
      onUploadImg={handleUploadImages}
    />
  )
}
