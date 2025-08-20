import { ALERT_MESSAGE, errorToast } from '@/app/(cms)/_shared/lib'

import Container from './ui/container'

export default async function Page() {
  let initialData

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/basic`)

    if (!res.ok) {
      throw Error('')
    }

    initialData = await res.json()
  } catch {
    errorToast(ALERT_MESSAGE.SERVER_ERROR)
    initialData = null
  }

  return <Container initialData={initialData} />
}
