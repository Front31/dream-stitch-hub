import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import rifaLogo from '@/assets/rifa-logo.png';

const SITE_PASSWORD = 'rifacards2025';

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem('rifa-auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem('rifa-auth', 'true');
      setAuthenticated(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center space-y-8"
      >
        <motion.img
          src={rifaLogo}
          alt="RiFa Cards"
          className="h-24 mx-auto logo-pulse"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">Im Aufbau</h1>
          <p className="text-muted-foreground text-sm">
            Unser Shop wird gerade vorbereitet. Bitte Passwort eingeben.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 ${error ? 'border-destructive animate-shake' : ''}`}
              autoFocus
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-sm"
            >
              Falsches Passwort
            </motion.p>
          )}
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Zugang erhalten
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default PasswordGate;
