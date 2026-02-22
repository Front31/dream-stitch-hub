import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import rifaLogo from '@/assets/rifa-logo.png';
import CartDrawer from './CartDrawer';

const FloatingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const showLogo = !isHomePage || isScrolled;
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Produkte', path: '/collection' },
    { label: 'Über uns', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Kontakt', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        className={`header-floating ${isScrolled ? 'scrolled' : ''}`}
        style={{ opacity: headerOpacity }}
      >
        <div className="container mx-auto px-6 py-3 transition-all duration-500 ease-out"
        >
          <div className="flex items-center justify-between relative">
            <div className="overflow-hidden flex-shrink-0" style={{ 
              width: showLogo ? 'auto' : '0px',
              opacity: showLogo ? 1 : 0,
              transition: 'opacity 0.4s ease, width 0.4s ease'
            }}>
              <Link to="/" className="relative z-10 block">
                <motion.img
                  src={rifaLogo}
                  alt="RiFa Cards"
                  className="h-12 md:h-14 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-display font-medium text-sm tracking-wide transition-colors duration-300
                    ${location.pathname === item.path
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <CartDrawer />

              <motion.button
                className="lg:hidden p-2 rounded-full hover:bg-secondary transition-colors"
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menü"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[76px] z-40 bg-background/98 backdrop-blur-xl border-b border-border lg:hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-display font-medium text-lg py-2 border-b border-border/50
                    ${location.pathname === item.path ? 'text-primary' : 'text-foreground'}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/shipping"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-display font-medium text-lg py-2 border-b border-border/50
                  ${location.pathname === '/shipping' ? 'text-primary' : 'text-foreground'}`}
              >
                Versand & Rückgabe
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingHeader;
