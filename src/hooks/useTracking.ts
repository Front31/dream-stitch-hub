import { useEffect } from 'react';
import { useCookieConsentStore } from '@/stores/cookieConsentStore';
import { loadGoogleAnalytics, removeGoogleAnalytics } from '@/lib/tracking';

export function useTracking() {
  const { consentGiven, preferences } = useCookieConsentStore();

  useEffect(() => {
    if (!consentGiven) return;

    if (preferences.analytics) {
      loadGoogleAnalytics();
    } else {
      removeGoogleAnalytics();
    }

    // TODO: Facebook Pixel – uncomment when ID is available
    // if (preferences.marketing) {
    //   loadFacebookPixel();
    // }
  }, [consentGiven, preferences]);
}
