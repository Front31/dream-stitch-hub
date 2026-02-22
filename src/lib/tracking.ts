// Google Analytics & Facebook Pixel – loaded conditionally based on cookie consent

const GA_ID = 'G-ZS44DFT9XT';
const FB_PIXEL_ID = '1625906195211164';

let gaLoaded = false;
let fbLoaded = false;

export function loadGoogleAnalytics() {
  if (gaLoaded || !GA_ID) return;
  gaLoaded = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
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
}

export function loadFacebookPixel() {
  if (fbLoaded || !FB_PIXEL_ID) return;
  fbLoaded = true;

  (function(f: any,b: any,e: any,v: any,n?: any,t?: any,s?: any){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  (window as any).fbq('init', FB_PIXEL_ID);
  (window as any).fbq('track', 'PageView');
}

export function removeFacebookPixel() {
  // Disable FB tracking by removing the script
  (window as any).fbq = null;
  (window as any)._fbq = null;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}
