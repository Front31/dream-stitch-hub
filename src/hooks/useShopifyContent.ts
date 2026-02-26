import { useState, useEffect } from 'react';
import { fetchShopPolicies, fetchPageByHandle, fetchShopMetafields, type ShopPolicies, type ShopifyPage, type ShopifyMetafield } from '@/lib/shopify';

// Cache to avoid refetching on every page navigation
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache[key];
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  return null;
}

function setCache(key: string, data: unknown) {
  cache[key] = { data, timestamp: Date.now() };
}

export function useShopPolicies() {
  const [policies, setPolicies] = useState<ShopPolicies | null>(getCached<ShopPolicies>('policies'));
  const [isLoading, setIsLoading] = useState(!policies);

  useEffect(() => {
    if (policies) return;
    const load = async () => {
      setIsLoading(true);
      const data = await fetchShopPolicies();
      if (data) {
        setCache('policies', data);
        setPolicies(data);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  return { policies, isLoading };
}

export function useShopifyPage(handle: string) {
  const cacheKey = `page-${handle}`;
  const [page, setPage] = useState<ShopifyPage | null>(getCached<ShopifyPage>(cacheKey));
  const [isLoading, setIsLoading] = useState(!page);

  useEffect(() => {
    if (page) return;
    const load = async () => {
      setIsLoading(true);
      const data = await fetchPageByHandle(handle);
      if (data) {
        setCache(cacheKey, data);
        setPage(data);
      }
      setIsLoading(false);
    };
    load();
  }, [handle]);

  return { page, isLoading };
}

export function useShopMetafields(identifiers: Array<{ namespace: string; key: string }>) {
  const cacheKey = `metafields-${JSON.stringify(identifiers)}`;
  const [metafields, setMetafields] = useState<(ShopifyMetafield | null)[]>(getCached<(ShopifyMetafield | null)[]>(cacheKey) || []);
  const [isLoading, setIsLoading] = useState(metafields.length === 0);

  useEffect(() => {
    if (metafields.length > 0) return;
    const load = async () => {
      setIsLoading(true);
      const data = await fetchShopMetafields(identifiers);
      setCache(cacheKey, data);
      setMetafields(data);
      setIsLoading(false);
    };
    load();
  }, [cacheKey]);

  return { metafields, isLoading };
}
