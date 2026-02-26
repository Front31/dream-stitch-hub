import { useQuery } from '@tanstack/react-query';
import { fetchMenu, type ShopifyMenu, type ShopifyMenuItem } from '@/lib/shopify';

/**
 * Converts a Shopify menu item URL to a local route path.
 * Shopify returns full URLs like https://store.myshopify.com/pages/about
 * We need to convert them to /about, /collection, etc.
 */
function shopifyUrlToPath(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;

    // /collections/* → /collection (or /collection?type=handle)
    if (path.startsWith('/collections')) {
      const handle = path.replace('/collections/', '').replace('/collections', '');
      if (!handle || handle === 'all') return '/collection';
      return `/collection?type=${handle}`;
    }

    // /pages/* → use handle directly as route
    if (path.startsWith('/pages/')) {
      const handle = path.replace('/pages/', '');
      // Map known pages to their routes
      const pageRoutes: Record<string, string> = {
        'about': '/about',
        'uber-uns': '/about',
        'ueber-uns': '/about',
        'faq': '/faq',
        'contact': '/contact',
        'kontakt': '/contact',
        'shipping': '/shipping',
        'versand': '/shipping',
        'impressum': '/impressum',
        'datenschutz': '/datenschutz',
        'agb': '/agb',
      };
      return pageRoutes[handle] || `/${handle}`;
    }

    // /products/* → /product/handle
    if (path.startsWith('/products/')) {
      const handle = path.replace('/products/', '');
      return `/product/${handle}`;
    }

    // Root or other paths
    if (path === '/' || path === '') return '/';

    return path;
  } catch {
    // If it's not a valid URL, return as-is
    return url;
  }
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

function menuItemToNavItem(item: ShopifyMenuItem): NavItem {
  return {
    label: item.title,
    path: shopifyUrlToPath(item.url),
    children: item.items?.length ? item.items.map(menuItemToNavItem) : undefined,
  };
}

export function useShopifyMenu(handle: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['shopify-menu', handle],
    queryFn: () => fetchMenu(handle),
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: 1,
  });

  const navItems: NavItem[] = data?.items?.map(menuItemToNavItem) || [];

  return { menu: data, navItems, isLoading, error };
}
