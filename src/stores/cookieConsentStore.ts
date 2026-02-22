import { create } from 'zustand';

export type CookieCategory = 'necessary' | 'analytics' | 'marketing';

interface CookieConsentState {
  consentGiven: boolean;
  showBanner: boolean;
  showSettings: boolean;
  preferences: Record<CookieCategory, boolean>;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Record<CookieCategory, boolean>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  openBanner: () => void;
}

const STORAGE_KEY = 'rifa-cookie-consent';

const loadConsent = (): { consentGiven: boolean; preferences: Record<CookieCategory, boolean> } | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
};

const saveConsent = (preferences: Record<CookieCategory, boolean>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ consentGiven: true, preferences }));
};

const defaultPreferences: Record<CookieCategory, boolean> = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const stored = loadConsent();

export const useCookieConsentStore = create<CookieConsentState>((set) => ({
  consentGiven: stored?.consentGiven ?? false,
  showBanner: !stored?.consentGiven,
  showSettings: false,
  preferences: stored?.preferences ?? { ...defaultPreferences },

  acceptAll: () => {
    const prefs = { necessary: true, analytics: true, marketing: true };
    saveConsent(prefs);
    set({ consentGiven: true, showBanner: false, showSettings: false, preferences: prefs });
  },

  rejectAll: () => {
    const prefs = { necessary: true, analytics: false, marketing: false };
    saveConsent(prefs);
    set({ consentGiven: true, showBanner: false, showSettings: false, preferences: prefs });
  },

  savePreferences: (prefs) => {
    const finalPrefs = { ...prefs, necessary: true };
    saveConsent(finalPrefs);
    set({ consentGiven: true, showBanner: false, showSettings: false, preferences: finalPrefs });
  },

  openSettings: () => set({ showSettings: true }),
  closeSettings: () => set({ showSettings: false }),
  openBanner: () => set({ showBanner: true, showSettings: false }),
}));
