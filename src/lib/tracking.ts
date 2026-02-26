// Google Analytics & Facebook Pixel – loaded conditionally based on cookie consent

const GA_ID = 'G-ZS44DFT9XT';
const FB_PIXEL_ID = '1625906195211164';

let gaLoaded = false;
let fbLoaded = false;

export function loadGoogleAnalytics() {
  if (gaLoaded || !GA_ID) return;
  gaLoaded = true;

  // Remove any previous disable flag
  delete (window as any)[`ga-disable-${GA_ID}`];

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  script.id = 'ga-script';
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}

export function removeGoogleAnalytics() {
  // Disable GA tracking
  (window as any)[`ga-disable-${GA_ID}`] = true;

  // Remove the script tag
  const script = document.getElementById('ga-script');
  if (script) script.remove();

  // Clear dataLayer
  window.dataLayer = [];

  // Remove GA cookies
  document.cookie.split(';').forEach((c) => {
    const name = c.trim().split('=')[0];
    if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    }
  });

  gaLoaded = false;
}

export function loadFacebookPixel() {
  if (fbLoaded || !FB_PIXEL_ID) return;
  fbLoaded = true;

  (function(f: any,b: any,e: any,v: any,n?: any,t?: any,s?: any){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;t.id='fb-pixel-script';s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  (window as any).fbq('init', FB_PIXEL_ID);
  (window as any).fbq('track', 'PageView');
}

export function removeFacebookPixel() {
  // Remove fbq
  (window as any).fbq = null;
  (window as any)._fbq = null;

  // Remove the script tag
  const script = document.getElementById('fb-pixel-script');
  if (script) script.remove();

  // Remove FB cookies
  document.cookie.split(';').forEach((c) => {
    const name = c.trim().split('=')[0];
    if (name.startsWith('_fbp') || name.startsWith('_fbc')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    }
  });

  fbLoaded = false;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}
