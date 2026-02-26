import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocaleStore, localeLabels, type SupportedLocale } from '@/stores/localeStore';

const locales: SupportedLocale[] = ['de', 'en'];

const LocaleSwitcher = () => {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocaleStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        aria-label="Language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-medium uppercase">{locale}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[140px] z-50"
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => { setLocale(l); setOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                  locale === l
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <span className="uppercase text-xs font-bold w-5">{l}</span>
                <span>{localeLabels[l]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocaleSwitcher;
