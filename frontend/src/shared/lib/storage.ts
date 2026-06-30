export const keys = {
  BearerToken: 'bearer_token',
  RequestId: 'request_id',
} as const

type TKey = (typeof keys)[keyof typeof keys]

export const storage = {
  set(key: TKey, value: string): void {
    localStorage.setItem(key, value)
  },

  get(key: TKey): string | null {
    return localStorage.getItem(key)
  },

  remove(key: TKey): void {
    localStorage.removeItem(key)
  },

  clear(): void {
    localStorage.clear()
  },
}
