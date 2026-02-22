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
            <div className="flex items-center gap-4 mt-4">
              <a href="https://discord.gg/8AxJJMqhxq" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="Discord">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 0-2.83 2M15.91 9a3 3 0 0 1 2.83 2"/><path d="M8 15a3.5 3.5 0 0 0 4 0 3.5 3.5 0 0 0 4 0"/><path d="M20.2 5.2c-1.6-.8-3.3-1.4-5.1-1.7l-.7 1.3c-1.8-.3-3-.3-4.8 0l-.7-1.3c-1.8.3-3.5.9-5.1 1.7C1.5 9.3.8 13.3 1.2 17.2 3.2 18.8 5.1 19.8 7 20.3l1-1.4c-.9-.3-1.8-.8-2.6-1.3l.6-.5c2.5 1.2 5.5 1.2 8 0l.6.5c-.8.5-1.7 1-2.6 1.3l1 1.4c1.9-.5 3.8-1.5 5.8-3.1.4-4-.7-8-3.6-12.1z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>
              </a>
              <a href="https://www.instagram.com/rifacards.de/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-7 h-7" />
              </a>
              <a href="https://www.tiktok.com/@rifacards.de" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="TikTok">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="https://www.youtube.com/@RiFaCards" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-7 h-7" />
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
