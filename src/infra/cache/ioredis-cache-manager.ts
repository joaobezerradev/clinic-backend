import Redis from 'ioredis'

import { type CacheManager } from './cache-manager'

export class RedisCacheManager implements CacheManager {
  private readonly client: Redis

  constructor () {
    this.client = new Redis({
      // Your Redis configurations here
    })
  }

  async set (key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl)
    } else {
      await this.client.set(key, value)
    }
  }

  async get (key: string): Promise<string | null> {
    return this.client.get(key)
  }

  async del (key: string): Promise<void> {
    await this.client.del(key)
  }
}
