import { useEffect } from 'react';
import { useCookieConsentStore } from '@/stores/cookieConsentStore';
import { loadGoogleAnalytics, removeGoogleAnalytics, loadFacebookPixel, removeFacebookPixel } from '@/lib/tracking';

export function useTracking() {
  const { consentGiven, preferences } = useCookieConsentStore();

  useEffect(() => {
    if (!consentGiven) return;

    if (preferences.analytics) {
      loadGoogleAnalytics();
    } else {
      removeGoogleAnalytics();
    }

    if (preferences.marketing) {
      loadFacebookPixel();
    } else {
      removeFacebookPixel();
    }
  }, [consentGiven, preferences]);
}
