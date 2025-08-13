import { redirect } from 'next/navigation'

export default async function logout() {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    redirect('/admin/login')
  }
}
