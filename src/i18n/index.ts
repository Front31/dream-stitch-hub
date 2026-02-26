import de, { type TranslationKey } from './de';
import en from './en';
import type { SupportedLocale } from '@/stores/localeStore';

const translations: Record<SupportedLocale, Record<TranslationKey, string>> = { de, en };

export function getTranslation(locale: SupportedLocale, key: TranslationKey, params?: Record<string, string>): string {
  let text = translations[locale]?.[key] || translations.de[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }
  return text;
}

export type { TranslationKey };
