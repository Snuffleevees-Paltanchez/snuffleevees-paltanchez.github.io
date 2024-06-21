interface RequestOptions extends RequestInit {
  headers?: HeadersInit
  body?: BodyInit
  params?: Record<string, string | undefined>
}

const getQueryParamsString = (params: RequestOptions['params']) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== undefined),
  ) as Record<string, string>
  const searchParams = new URLSearchParams(filteredParams)
  if (searchParams.size) {
    return `?${searchParams.toString()}`
  }
  return ''
}

const createRequest = async <T>(
  baseUrl: string,
  endpoint: string,
  options: RequestOptions,
): Promise<T> => {
  const defaultOptions: RequestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  const config: RequestOptions = { ...defaultOptions, ...options }

  if (config.params) {
    endpoint += getQueryParamsString(config.params)
  }

  try {
    console.log('baseUrl', baseUrl + endpoint)
    const response = await fetch(`${baseUrl}${endpoint}`, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Create a client to make requests to the API
 * @param baseUrl The base URL of the API
 * @returns An object with methods to make requests
 * @example
 * const baseUrl = import.meta.env.VITE_API_URL
 * const api = client(baseUrl)
 * const data = await api.get('/books')
 */
const client = (baseUrl: string) => ({
  get: <T>(endpoint: string, options: RequestOptions = {}): Promise<T> =>
    createRequest<T>(baseUrl, endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body: BodyInit, options: RequestOptions = {}): Promise<T> =>
    createRequest<T>(baseUrl, endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: BodyInit, options: RequestOptions = {}): Promise<T> =>
    createRequest<T>(baseUrl, endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options: RequestOptions = {}): Promise<T> =>
    createRequest<T>(baseUrl, endpoint, { ...options, method: 'DELETE' }),
})

export default client
