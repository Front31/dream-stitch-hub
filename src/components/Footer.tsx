import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import rifaLogo from '@/assets/rifa-logo.png';
import { useCookieConsentStore } from '@/stores/cookieConsentStore';
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

const Footer = () => {
  const openBanner = useCookieConsentStore((s) => s.openBanner);

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link to="/">
              <img src={rifaLogo} alt="RiFa Cards" className="h-14 mb-4" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              Premium Pokémon TCG Sealed Produkte. Booster Displays, Elite Trainer Boxen
              und Special Collections für echte Sammler.
            </p>
            <p className="text-xs text-muted-foreground">
              Keine Einzelkarten. Nur original versiegelte Produkte.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://discord.gg/8AxJJMqhxq" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="Discord">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M8.12 12.09c-.68 0-1.24.6-1.24 1.33 0 .73.57 1.33 1.24 1.33.68 0 1.24-.6 1.24-1.33.01-.73-.56-1.33-1.24-1.33zm7.76 0c-.68 0-1.24.6-1.24 1.33 0 .73.57 1.33 1.24 1.33.68 0 1.24-.6 1.24-1.33 0-.73-.56-1.33-1.24-1.33z"/><path d="M19.1 4.9S17.36 3.73 15.35 3.5l-.24.49a15.6 15.6 0 0 0-6.22 0L8.65 3.5C6.64 3.73 4.9 4.9 4.9 4.9S2.45 8.65 2 16.08a7.8 7.8 0 0 0 5.97 2.92s.72-.88 1.31-1.62a5.9 5.9 0 0 1-3.32-2.24l.53.33.42.24.41.18a14.3 14.3 0 0 0 9.36 0l.41-.18.42-.24.53-.33a5.92 5.92 0 0 1-3.34 2.24c.59.74 1.31 1.62 1.31 1.62A7.8 7.8 0 0 0 22 16.08C21.55 8.65 19.1 4.9 19.1 4.9z"/></svg>
              </a>
              <a href="https://www.instagram.com/rifacards.de/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-[18px] h-[18px]" />
              </a>
              <a href="https://www.tiktok.com/@rifacards.de" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="TikTok">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="https://www.youtube.com/@RiFaCards" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/collection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Alle Produkte
                </Link>
              </li>
              <li>
                <Link to="/collection?type=display" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Booster Displays
                </Link>
              </li>
              <li>
                <Link to="/collection?type=etb" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Elite Trainer Boxen
                </Link>
              </li>
              <li>
                <Link to="/collection?type=collection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Special Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">Info</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Versand & Rückgabe
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-primary">Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@rifacards.de" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  info@rifacards.de
                </a>
              </li>
              <li className="text-sm text-muted-foreground">
                Antwort innerhalb 24h
              </li>
              <li className="pt-2">
                <span className="text-xs text-muted-foreground">
                  Sichere Zahlung mit
                </span>
                <div className="flex flex-wrap items-center gap-2.5 mt-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="h-9 w-14 rounded-md border border-border/50 bg-white flex items-center justify-center p-1.5 shadow-sm"
                      title={method.name}
                    >
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
            © {new Date().getFullYear()} RiFa Cards. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/impressum" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Datenschutz
            </Link>
            <Link to="/agb" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              AGB
            </Link>
            <button onClick={openBanner} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
