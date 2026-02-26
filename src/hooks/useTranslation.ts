import { useLocaleStore } from '@/stores/localeStore';
import { getTranslation, type TranslationKey } from '@/i18n';

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);

  const t = (key: TranslationKey, params?: Record<string, string>) => {
    return getTranslation(locale, key, params);
  };

  return { t, locale };
}
