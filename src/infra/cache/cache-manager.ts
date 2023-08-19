export interface CacheManager {
  set: (key: string, value: string, ttl?: number) => Promise<void>
  get: (key: string) => Promise<string | null>
  del: (key: string) => Promise<void>
}
