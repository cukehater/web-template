export const login = async (userId: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
