import { useState, useEffect } from 'react';
import { fetchShopPolicies, fetchPageByHandle, fetchShopMetafields, fetchMenu, mapShopifyUrlToLocal, type ShopPolicies, type ShopifyPage, type ShopifyMetafield, type ShopifyMenu } from '@/lib/shopify';
import { useLocaleStore, localeToShopify } from '@/stores/localeStore';

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
  const locale = useLocaleStore((s) => s.locale);
  const localeCtx = localeToShopify[locale];
  const cacheKey = `policies-${locale}`;
  const [policies, setPolicies] = useState<ShopPolicies | null>(getCached<ShopPolicies>(cacheKey));
  const [isLoading, setIsLoading] = useState(!policies);

  useEffect(() => {
    const cached = getCached<ShopPolicies>(cacheKey);
    if (cached) { setPolicies(cached); setIsLoading(false); return; }
    const load = async () => {
      setIsLoading(true);
      const data = await fetchShopPolicies(localeCtx);
      if (data) {
        setCache(cacheKey, data);
        setPolicies(data);
      }
      setIsLoading(false);
    };
    load();
  }, [locale, cacheKey]);

  return { policies, isLoading };
}

export function useShopifyPage(handle: string) {
  const locale = useLocaleStore((s) => s.locale);
  const localeCtx = localeToShopify[locale];
  const cacheKey = `page-${handle}-${locale}`;
  const [page, setPage] = useState<ShopifyPage | null>(getCached<ShopifyPage>(cacheKey));
  const [isLoading, setIsLoading] = useState(!page);

  useEffect(() => {
    const cached = getCached<ShopifyPage>(cacheKey);
    if (cached) { setPage(cached); setIsLoading(false); return; }
    const load = async () => {
      setIsLoading(true);
      const data = await fetchPageByHandle(handle, localeCtx);
      if (data) {
        setCache(cacheKey, data);
        setPage(data);
      }
      setIsLoading(false);
    };
    load();
  }, [handle, locale, cacheKey]);

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

export interface MenuNavItem {
  label: string;
  path: string;
}

export function useShopifyMenu(handle: string) {
  const locale = useLocaleStore((s) => s.locale);
  const localeCtx = localeToShopify[locale];
  const cacheKey = `menu-${handle}-${locale}`;
  const [menu, setMenu] = useState<ShopifyMenu | null>(getCached<ShopifyMenu>(cacheKey));
  const [isLoading, setIsLoading] = useState(!menu);

  useEffect(() => {
    const cached = getCached<ShopifyMenu>(cacheKey);
    if (cached) { setMenu(cached); setIsLoading(false); return; }
    const load = async () => {
      setIsLoading(true);
      const data = await fetchMenu(handle, localeCtx);
      if (data) {
        setCache(cacheKey, data);
        setMenu(data);
      }
      setIsLoading(false);
    };
    load();
  }, [handle, locale, cacheKey]);

  // Convert menu items to simple { label, path } array
  const navItems: MenuNavItem[] = (menu?.items || []).map((item) => ({
    label: item.title,
    path: mapShopifyUrlToLocal(item.url),
  }));

  return { menu, navItems, isLoading };
}
