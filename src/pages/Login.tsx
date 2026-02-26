import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCustomerStore } from '@/stores/customerStore';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import rifaLogo from '@/assets/rifa-logo.png';

type Tab = 'login' | 'register' | 'recover';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, recoverPassword, isLoading } = useCustomerStore();
  const [tab, setTab] = useState<Tab>('login');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/account');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register({ email, password, firstName, lastName });
    if (success) {
      setTab('login');
      setPassword('');
    }
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await recoverPassword(email);
    if (success) setTab('login');
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingHeader />
      <div className="pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <img src={rifaLogo} alt="RiFa Cards" className="h-16 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground">Kundenkonto</h1>
          </div>

          {/* Tab selector */}
          <div className="flex gap-1 mb-6 p-1 bg-secondary/50 rounded-lg">
            {([['login', 'Anmelden'], ['register', 'Registrieren']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  tab === key
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'login' && (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowRight className="h-4 w-4 mr-2" />Anmelden</>}
                </Button>
                <button type="button" onClick={() => setTab('recover')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Passwort vergessen?
                </button>
              </motion.form>
            )}

            {tab === 'register' && (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Vorname" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="pl-10" />
                  </div>
                  <Input placeholder="Nachname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required minLength={5} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowRight className="h-4 w-4 mr-2" />Konto erstellen</>}
                </Button>
              </motion.form>
            )}

            {tab === 'recover' && (
              <motion.form
                key="recover"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleRecover}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground">Gib deine E-Mail ein und wir senden dir einen Link zum Zurücksetzen.</p>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Link senden'}
                </Button>
                <button type="button" onClick={() => setTab('login')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Zurück zum Login
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
