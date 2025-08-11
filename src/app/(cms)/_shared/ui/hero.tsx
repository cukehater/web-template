'use client'

import { useSession } from '../../_entities/auth'

export default function Hero() {
  const { session } = useSession()

  return (
    <div>
      <h2>안녕하세요, {session?.user?.name}님!</h2>
    </div>
  )
}
