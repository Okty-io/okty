import {Injectable} from '@angular/core';

interface CacheData {
  content: string;
  time: number;
}

@Injectable()
export class CacheService {

  private CACHE_PREFIX = 'octopy_';
  private CACHE_LIFETIME = 3600000; // 1 hour in millisecond

  public get(key: string): any {
    key = this.CACHE_PREFIX + key;

    const cacheStringify: string = localStorage.getItem(key);
    if (!cacheStringify) {
      return null;
    }

    const cache: CacheData = JSON.parse(cacheStringify);

    if (Date.now() - cache.time > this.CACHE_LIFETIME) {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.parse(cache.content);
  }

  public set(key: string, data: any): void {
    key = this.CACHE_PREFIX + key;

    const cache: CacheData = {
      content: JSON.stringify(data),
      time: Date.now()
    };

    localStorage.setItem(key, JSON.stringify(cache));
  }
}
