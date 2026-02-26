import { useQuery } from '@tanstack/react-query';
import { fetchLocalization, type ShopifyLocalization } from '@/lib/shopify';

export function useShopifyLocalization() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['shopify-localization'],
    queryFn: fetchLocalization,
    staleTime: 10 * 60 * 1000, // 10 min cache
    retry: 1,
  });

  return {
    localization: data,
    currentCountry: data?.country || null,
    currentLanguage: data?.language || null,
    availableCountries: data?.availableCountries || [],
    isLoading,
    error,
  };
}
