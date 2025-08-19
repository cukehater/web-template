export default async function login(userId: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId, password }),
  })

  if (res.ok) {
    const { user } = await res.json()
    return { user }
  } else {
    const error = await res.json()
    return error
  }
}
