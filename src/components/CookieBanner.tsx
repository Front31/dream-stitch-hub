import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, BarChart3, Megaphone, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCookieConsentStore, type CookieCategory } from '@/stores/cookieConsentStore';

const categories: { key: CookieCategory; label: string; description: string; icon: React.ReactNode; required?: boolean }[] = [
  {
    key: 'necessary',
    label: 'Notwendig',
    description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich (z.B. Warenkorb, Sicherheit). Sie können nicht deaktiviert werden.',
    icon: <Shield className="w-4 h-4" />,
    required: true,
  },
  {
    key: 'analytics',
    label: 'Statistik',
    description: 'Helfen uns zu verstehen, wie Besucher die Website nutzen. Alle Daten werden anonymisiert erhoben.',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Werden verwendet, um Besuchern relevante Werbung und Angebote anzuzeigen.',
    icon: <Megaphone className="w-4 h-4" />,
  },
];

const CookieBanner = () => {
  const { showBanner, showSettings, acceptAll, rejectAll, savePreferences, openSettings, closeSettings, preferences } = useCookieConsentStore();
  const [localPrefs, setLocalPrefs] = useState<Record<CookieCategory, boolean>>({ ...preferences });

  if (!showBanner) return null;

  const handleToggle = (key: CookieCategory) => {
    if (key === 'necessary') return;
    setLocalPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      >
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-[var(--shadow-elevated)] overflow-hidden">
          {/* Main Banner */}
          <div className="p-5 md:p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base mb-1">Wir respektieren deine Privatsphäre</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wir verwenden Cookies, um dein Einkaufserlebnis zu verbessern. Du kannst selbst entscheiden, welche Cookies du zulassen möchtest.{' '}
                  <Link to="/datenschutz" className="text-accent hover:underline">
                    Mehr erfahren
                  </Link>
                </p>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 mb-4 pt-4 border-t border-border">
                    {categories.map((cat) => (
                      <div
                        key={cat.key}
                        className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 mt-0.5">
                          {cat.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display font-semibold text-sm">{cat.label}</span>
                            <button
                              onClick={() => handleToggle(cat.key)}
                              disabled={cat.required}
                              className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${
                                localPrefs[cat.key]
                                  ? 'bg-primary'
                                  : 'bg-muted'
                              } ${cat.required ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <span
                                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                                  localPrefs[cat.key] ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cat.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={acceptAll}
                className="flex-1 px-4 py-2.5 rounded-xl font-display font-semibold text-sm text-accent-foreground transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(24 90% 48%))' }}
              >
                Alle akzeptieren
              </button>
              {showSettings ? (
                <button
                  onClick={() => savePreferences(localPrefs)}
                  className="flex-1 px-4 py-2.5 rounded-xl font-display font-semibold text-sm bg-primary text-primary-foreground transition-all hover:opacity-90"
                >
                  Auswahl speichern
                </button>
              ) : (
                <button
                  onClick={openSettings}
                  className="flex-1 px-4 py-2.5 rounded-xl font-display font-semibold text-sm bg-secondary text-secondary-foreground border border-border transition-all hover:bg-muted flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Einstellungen
                </button>
              )}
              <button
                onClick={rejectAll}
                className="flex-1 px-4 py-2.5 rounded-xl font-display font-semibold text-sm bg-secondary text-secondary-foreground border border-border transition-all hover:bg-muted"
              >
                Nur notwendige
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
