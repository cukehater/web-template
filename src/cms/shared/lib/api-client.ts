import { ALERT_MESSAGE } from './alert-message'

export async function apiClient<T>(
  url: string,
  options?: {
    headers?: Record<string, string>
    cache?: RequestCache
    revalidate?: number
  },
): Promise<{ data: T; error: string | null }> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      cache: options?.cache || 'no-store',
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    })

    if (!response.ok) {
      return {
        data: {} as T,
        error: ALERT_MESSAGE.REQUEST_ERROR,
      }
    }

    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    return {
      data: {} as T,
      error:
        error instanceof Error ? error.message : ALERT_MESSAGE.REQUEST_ERROR,
    }
  }
}
