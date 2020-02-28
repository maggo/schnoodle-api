import { KeyValueCache, KeyValueCacheSetOptions } from "apollo-server-caching";

type CFCacheOps = {
  expiration?: string | number;
  expirationTtl?: string | number;
};

export class CloudflareCache implements KeyValueCache {
  async get(key: string) {
    const value = await SCHNOODLE_GRAPHQL_CACHE.get(key);
    console.log("Getting cache", key, value);
    return value || undefined;
  }

  async set(key: string, value: string, options?: KeyValueCacheSetOptions) {
    let opts: CFCacheOps = {};
    const ttl = options?.ttl;
    if (ttl) {
      opts.expirationTtl = ttl;
    }
    console.log("Writing cache", key, value, opts);
    return SCHNOODLE_GRAPHQL_CACHE.put(key, value, opts);
  }

  async delete(key: string) {
    return SCHNOODLE_GRAPHQL_CACHE.delete(key);
  }
}
