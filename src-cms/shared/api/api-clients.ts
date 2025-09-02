import { ALERT_MESSAGES } from '../lib'

interface ApiClientOptionsType {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: Record<string, unknown> | FormData
  cache?: RequestCache
  revalidate?: number
  credentials?: RequestCredentials
  signal?: AbortSignal
}

interface ApiResponseType<T> {
  data?: T
  message: string
  ok: boolean
}

async function serverApiClient<T>(
  url: string,
  options?: ApiClientOptionsType
): Promise<ApiResponseType<T>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
      cache: options?.cache || 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      credentials: options?.credentials || 'same-origin',
      signal: options?.signal
    })

    const result = await res.json()

    if (!res.ok) {
      return {
        message: result.message || ALERT_MESSAGES.REQUEST_ERROR,
        ok: false
      }
    }

    return { data: result?.data || {}, message: result.message, ok: true }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : ALERT_MESSAGES.REQUEST_ERROR,
      ok: false
    }
  }
}

async function clientApiClient<T>(
  url: string,
  options?: ApiClientOptionsType
): Promise<ApiResponseType<T>> {
  try {
    const isFormData = options?.body instanceof FormData

    let body: BodyInit | undefined = undefined
    if (isFormData) {
      body = options.body as FormData
    } else {
      body = JSON.stringify(options?.body)
    }

    const headers: Record<string, string> = {}
    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }
    if (options?.headers) {
      Object.assign(headers, options.headers)
    }

    const res = await fetch(url, {
      method: options?.method || 'GET',
      headers,
      body,
      credentials: options?.credentials || 'include',
      signal: options?.signal
    })

    const result = await res.json()

    if (!res.ok) {
      return {
        message: result.message,
        ok: false
      }
    }

    return {
      data: result?.data || {},
      message: result.message,
      ok: true
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : ALERT_MESSAGES.REQUEST_ERROR,
      ok: false
    }
  }
}

function apiClient<T>(url: string, options?: ApiClientOptionsType): Promise<ApiResponseType<T>> {
  if (typeof window === 'undefined') {
    return serverApiClient(url, options)
  }

  return clientApiClient(url, options)
}

export async function apiGet<T>(
  url: string,
  options?: Omit<ApiClientOptionsType, 'method' | 'body'>
): Promise<ApiResponseType<T>> {
  return apiClient<T>(url, { ...options, method: 'GET' })
}

export async function apiPost<T>(
  url: string,
  body: Record<string, unknown> | FormData,
  options?: Omit<ApiClientOptionsType, 'method'>
): Promise<ApiResponseType<T>> {
  return apiClient<T>(url, {
    ...options,
    method: 'POST',
    body
  })
}

export async function apiPut<T>(
  url: string,
  body: Record<string, unknown>,
  options?: Omit<ApiClientOptionsType, 'method'>
): Promise<ApiResponseType<T>> {
  return apiClient<T>(url, { ...options, method: 'PUT', body })
}

export async function apiPatch<T>(
  url: string,
  body: Record<string, unknown>,
  options?: Omit<ApiClientOptionsType, 'method'>
): Promise<ApiResponseType<T>> {
  return apiClient<T>(url, { ...options, method: 'PATCH', body })
}

export async function apiDelete<T>(
  url: string,
  body: Record<string, unknown>,
  options?: Omit<ApiClientOptionsType, 'method' | 'body'>
): Promise<ApiResponseType<T>> {
  return apiClient<T>(url, { ...options, method: 'DELETE', body })
}
