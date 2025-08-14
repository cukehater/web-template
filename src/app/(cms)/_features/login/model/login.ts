export default async function login(userId: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId, password }),
  })

  if (response.ok) {
    const { user } = await response.json()
    return { user }
  } else {
    const error = await response.json()
    return error
  }
}
