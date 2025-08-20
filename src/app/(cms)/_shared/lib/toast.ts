import { toast } from 'sonner'

export const successToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    richColors: true,
  })
}
export const errorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    richColors: true,
  })
}
