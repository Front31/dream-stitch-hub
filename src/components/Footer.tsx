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
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="https://www.instagram.com/rifacards.de/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="https://www.tiktok.com/@rifacards.de" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="TikTok">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.16z"/></svg>
              </a>
              <a href="https://www.youtube.com/@RiFaCards" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-4.5 h-4.5" />
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
