import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import rifaLogo from '@/assets/rifa-logo.png';
import { useCookieConsentStore } from '@/stores/cookieConsentStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useShopifyMenu } from '@/hooks/useShopifyContent';
import visaIcon from '@/assets/payments/visa.svg';
import mastercardIcon from '@/assets/payments/mastercard.svg';
import amexIcon from '@/assets/payments/amex.svg';
import maestroIcon from '@/assets/payments/maestro.svg';
import paypalIcon from '@/assets/payments/paypal.svg';
import klarnaIcon from '@/assets/payments/klarna.svg';
import appleIcon from '@/assets/payments/apple.svg';
import googleIcon from '@/assets/payments/google.svg';

const paymentMethods = [
  { name: 'PayPal', icon: paypalIcon },
  { name: 'Klarna', icon: klarnaIcon },
  { name: 'Visa', icon: visaIcon },
  { name: 'Mastercard', icon: mastercardIcon },
  { name: 'American Express', icon: amexIcon },
  { name: 'Maestro', icon: maestroIcon },
  { name: 'Apple Pay', icon: appleIcon },
  { name: 'Google Pay', icon: googleIcon },
];

// Fallback links grouped by section
const FALLBACK_SHOP = [
  { label: 'footer.all_products', path: '/collection' },
  { label: 'footer.booster_displays', path: '/collection?type=display' },
  { label: 'footer.etb', path: '/collection?type=etb' },
  { label: 'footer.special_collections', path: '/collection?type=collection' },
];

const FALLBACK_INFO = [
  { label: 'nav.about', path: '/about' },
  { label: 'nav.faq', path: '/faq' },
  { label: 'nav.shipping', path: '/shipping' },
  { label: 'nav.contact', path: '/contact' },
];

const FALLBACK_LEGAL = [
  { label: 'footer.impressum', path: '/impressum' },
  { label: 'footer.datenschutz', path: '/datenschutz' },
  { label: 'footer.agb', path: '/agb' },
];

const Footer = () => {
  const openBanner = useCookieConsentStore((s) => s.openBanner);
  const { t } = useTranslation();
  const { navItems: footerItems } = useShopifyMenu('footer');

  // Split footer items into info links and legal links based on known legal paths
  const legalPaths = ['/impressum', '/datenschutz', '/agb', '/widerrufsbelehrung'];
  const shopPaths = ['/collection'];
  
  const dynamicShopLinks = footerItems.filter((item) => shopPaths.some((p) => item.path.startsWith(p)));
  const dynamicLegalLinks = footerItems.filter((item) => legalPaths.includes(item.path));
  const dynamicInfoLinks = footerItems.filter((item) => !legalPaths.includes(item.path) && !shopPaths.some((p) => item.path.startsWith(p)));

  const shopLinks = dynamicShopLinks.length > 0 ? dynamicShopLinks : FALLBACK_SHOP.map((i) => ({ label: t(i.label as any), path: i.path }));
  const infoLinks = dynamicInfoLinks.length > 0 ? dynamicInfoLinks : FALLBACK_INFO.map((i) => ({ label: t(i.label as any), path: i.path }));
  const legalLinks = dynamicLegalLinks.length > 0 ? dynamicLegalLinks : FALLBACK_LEGAL.map((i) => ({ label: t(i.label as any), path: i.path }));

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link to="/">
              <img src={rifaLogo} alt="RiFa Cards" className="h-14 mb-4" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              {t('footer.description')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('footer.sealed_only')}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="https://discord.gg/8AxJJMqhxq" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="Discord">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18.93 5.34a16.89 16.89 0 0 0-4.07-1.23.06.06 0 0 0-.07.03c-.18.31-.38.72-.52 1.04a15.72 15.72 0 0 0-4.54 0 10.4 10.4 0 0 0-.53-1.04.06.06 0 0 0-.07-.03 16.84 16.84 0 0 0-4.07 1.23.06.06 0 0 0-.03.02C2.4 9.36 1.73 13.25 2.06 17.1a.07.07 0 0 0 .03.05 16.85 16.85 0 0 0 4.99 2.47.07.07 0 0 0 .07-.02 11.57 11.57 0 0 0 1.01-1.61.06.06 0 0 0-.04-.09 11.17 11.17 0 0 1-1.56-.73.06.06 0 0 1-.01-.1c.1-.08.21-.16.31-.24a.06.06 0 0 1 .07-.01 12.18 12.18 0 0 0 10.13 0 .06.06 0 0 1 .07.01c.1.08.21.17.31.24a.06.06 0 0 1 0 .1c-.5.29-1.02.53-1.56.73a.06.06 0 0 0-.04.09c.3.56.63 1.1 1.01 1.61a.07.07 0 0 0 .07.02 16.82 16.82 0 0 0 5-2.47.07.07 0 0 0 .03-.05c.39-4.03-.67-7.88-2.8-11.73a.05.05 0 0 0-.02-.03zM8.68 14.56c-1.05 0-1.91-.95-1.91-2.12s.84-2.12 1.91-2.12c1.07 0 1.93.96 1.91 2.12 0 1.17-.85 2.12-1.91 2.12zm7.06 0c-1.05 0-1.91-.95-1.91-2.12s.84-2.12 1.91-2.12s1.93.96 1.91 2.12c0 1.17-.84 2.12-1.91 2.12z"/></svg>
              </a>
              <a href="https://www.instagram.com/rifacards.de/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-7 h-7" strokeWidth={1.75} />
              </a>
              <a href="https://www.tiktok.com/@rifacards.de" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="TikTok">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="https://www.youtube.com/@RiFaCards" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-7 h-7" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">{t('footer.shop')}</h4>
            <ul className="space-y-2">
              {shopLinks.map((item) => (
                <li key={item.path}><Link to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">{t('footer.info')}</h4>
            <ul className="space-y-2">
              {infoLinks.map((item) => (
                <li key={item.path}><Link to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">{t('footer.service')}</h4>
            <ul className="space-y-2">
              <li><a href="mailto:info@rifacards.de" className="text-sm text-muted-foreground hover:text-accent transition-colors">info@rifacards.de</a></li>
              <li className="text-sm text-muted-foreground">{t('footer.reply_time')}</li>
              <li className="pt-2">
                <span className="text-xs text-muted-foreground">{t('footer.secure_payment')}</span>
                <div className="flex flex-wrap items-center gap-2.5 mt-3">
                  {paymentMethods.map((method) => (
                    <div key={method.name} className="h-9 w-14 rounded-md border border-border/50 bg-white flex items-center justify-center p-1.5 shadow-sm" title={method.name}>
                      <img src={method.icon} alt={method.name} className="h-full w-full object-contain" />
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {t('footer.rights', { year: new Date().getFullYear().toString() })}
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((item) => (
              <Link key={item.path} to={item.path} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link>
            ))}
            <button onClick={openBanner} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t('footer.cookie_settings')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
