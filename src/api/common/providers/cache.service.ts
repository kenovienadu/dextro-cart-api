import { CACHE_MANAGER, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Cache } from 'cache-manager';


@Injectable()
export class CacheService implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  onModuleInit() {
    setInterval(() => {
      this.logCacheKeys();
    }, 5000)
  }

  async get(key: string) {
    const data = await this.cacheManager.get(key);
    return data;
  }

  async set(key: string, value: unknown, ttl = 1000) {
    await this.cacheManager.set(key, value, { ttl });
  }

  async clear() {
    await this.cacheManager.reset();
  }

  async del(key: string) {
    await this.cacheManager.del(key);
  }

  async logCacheKeys() {
    const keys = await this.cacheManager.store.keys() as string[];
    console.log(keys);
    console.log(new Date().toTimeString())
  }
}