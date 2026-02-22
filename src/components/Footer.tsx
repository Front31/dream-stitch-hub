import { Link } from 'react-router-dom';
import rifaLogo from '@/assets/rifa-logo.png';

const Footer = () => {
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
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  PayPal • Klarna • Kreditkarte
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
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Impressum
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Datenschutz
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
