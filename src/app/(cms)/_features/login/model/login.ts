export default async function login(userId: string, password: string) {
  // TODO: POST 요청 공통 처리 필요
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId, password }),
  })

  if (res.ok) {
    const { user } = await res.json()
    return { user }
  } else {
    const error = await res.json()
    return { error }
  }
}
