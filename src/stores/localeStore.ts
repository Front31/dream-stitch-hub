import { create } from 'zustand';

export type SupportedLocale = 'de' | 'en';
export type SupportedCurrency = 'EUR' | 'USD' | 'GBP' | 'CHF';

// Map locale to Shopify language/country codes for @inContext
export const localeToShopify: Record<SupportedLocale, { language: string; country: string }> = {
  de: { language: 'DE', country: 'DE' },
  en: { language: 'EN', country: 'US' },
};

export const currencySymbols: Record<SupportedCurrency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  CHF: 'CHF',
};

export const localeLabels: Record<SupportedLocale, string> = {
  de: 'Deutsch',
  en: 'English',
};

interface LocaleState {
  locale: SupportedLocale;
  currency: SupportedCurrency;
  setLocale: (locale: SupportedLocale) => void;
  setCurrency: (currency: SupportedCurrency) => void;
}

const STORAGE_KEY = 'rifa-locale';

const loadStored = (): { locale: SupportedLocale; currency: SupportedCurrency } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { locale: parsed.locale || 'de', currency: parsed.currency || 'EUR' };
    }
  } catch {}
  // Default: detect from browser
  const browserLang = navigator.language?.split('-')[0];
  return {
    locale: browserLang === 'en' ? 'en' : 'de',
    currency: 'EUR',
  };
};

const stored = loadStored();

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: stored.locale,
  currency: stored.currency,

  setLocale: (locale) => {
    const current = useLocaleStore.getState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ locale, currency: current.currency }));
    document.documentElement.lang = locale;
    set({ locale });
  },

  setCurrency: (currency) => {
    const current = useLocaleStore.getState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ locale: current.locale, currency }));
    set({ currency });
  },
}));
