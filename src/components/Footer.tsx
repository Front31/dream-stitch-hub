import { Link } from 'react-router-dom';
import rifaLogo from '@/assets/rifa-logo.png';
import { useCookieConsentStore } from '@/stores/cookieConsentStore';

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
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {/* PayPal */}
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded bg-[#003087] text-white text-[10px] font-bold tracking-wide select-none">
                    Pay<span className="text-[#009cde]">Pal</span>
                  </span>
                  {/* Klarna */}
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded bg-[#FFB3C7] text-[#0A0B09] text-[10px] font-bold tracking-wide select-none">
                    Klarna.
                  </span>
                  {/* Visa */}
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded bg-white border border-border text-[#1A1F71] text-[10px] font-bold italic tracking-wide select-none">
                    VISA
                  </span>
                  {/* Mastercard */}
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded bg-white border border-border select-none gap-0.5">
                    <span className="w-4 h-4 rounded-full bg-[#EB001B] -mr-1.5" />
                    <span className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-80" />
                  </span>
                  {/* Amex */}
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded bg-[#006FCF] text-white text-[9px] font-bold tracking-wide select-none">
                    AMEX
                  </span>
                  {/* Apple Pay */}
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded bg-black text-white text-[10px] font-medium tracking-wide select-none">
                     Pay
                  </span>
                  {/* Google Pay */}
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded bg-white border border-border text-[10px] font-medium select-none">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                    <span className="ml-0.5 text-muted-foreground">Pay</span>
                  </span>
                  {/* Shop Pay */}
                  <span className="inline-flex items-center justify-center h-8 px-3 rounded bg-[#5A31F4] text-white text-[10px] font-bold tracking-wide select-none">
                    Shop Pay
                  </span>
                  {/* Maestro */}
                  <span className="inline-flex items-center justify-center h-8 px-2.5 rounded bg-white border border-border select-none gap-0.5">
                    <span className="w-4 h-4 rounded-full bg-[#0099DF] -mr-1.5" />
                    <span className="w-4 h-4 rounded-full bg-[#000] opacity-70" />
                  </span>
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
