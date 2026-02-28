import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useCustomerStore } from '@/stores/customerStore';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import rifaLogo from '@/assets/rifa-logo.png';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

type Step = 'email' | 'code';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setStep('code');
    toast({ title: t('login.code_sent_toast'), description: t('login.code_sent_desc', { email }) });
  };

  const handleVerifyCode = async (value: string) => {
    if (value.length !== 6) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    toast({ title: t('login.success'), description: t('login.success_desc') });
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingHeader />
      <div className="pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={rifaLogo} alt="RiFa Cards" className="h-16 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground">{t('login.title')}</h1>
            <p className="text-muted-foreground text-sm mt-2">
              {step === 'email' ? t('login.email_prompt') : t('login.code_sent', { email })}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'email' && (
              <motion.form key="email" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} onSubmit={handleSendCode} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder={t('login.email_placeholder')} value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required autoFocus />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowRight className="h-4 w-4 mr-2" />{t('login.send_code')}</>}
                </Button>
              </motion.form>
            )}
            {step === 'code' && (
              <motion.div key="code" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={code} onChange={(val) => { setCode(val); if (val.length === 6) handleVerifyCode(val); }} disabled={isLoading}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /><InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {isLoading && <div className="flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>}
                <div className="text-center space-y-2">
                  <button type="button" onClick={handleSendCode} className="text-sm text-muted-foreground hover:text-foreground transition-colors" disabled={isLoading}>{t('login.resend_code')}</button><br />
                  <button type="button" onClick={() => { setStep('email'); setCode(''); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('login.other_email')}</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
