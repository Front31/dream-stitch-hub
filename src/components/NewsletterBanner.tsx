import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { storefrontApiRequest } from '@/lib/shopify';
import { z } from 'zod';

const emailSchema = z.string().trim().email().max(255);

const NEWSLETTER_SIGNUP_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;

async function subscribeToNewsletter(email: string) {
  const data = await storefrontApiRequest(NEWSLETTER_SIGNUP_MUTATION, {
    input: {
      email,
      acceptsMarketing: true,
      password: crypto.randomUUID() + 'A1!',
    },
  });
  const result = data?.data?.customerCreate;
  const errors = result?.customerUserErrors || [];
  // "TAKEN" means already subscribed — treat as success
  if (errors.length > 0 && errors[0].code !== 'TAKEN') {
    throw new Error(errors[0].message);
  }
  return true;
}

const NewsletterBanner = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus('error');
      setErrorMsg(t('newsletter.invalid_email'));
      return;
    }
    setStatus('loading');
    try {
      await subscribeToNewsletter(parsed.data);
      setStatus('success');
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('newsletter.error'));
    }
  };

  return (
    <section className="py-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.06] rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border p-6 md:p-8 shadow-[var(--shadow-card)]">
            {/* Text + Form in compact layout */}
            <div className="text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent uppercase tracking-widest">
                  {t('newsletter.badge')}
                </span>
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                {t('newsletter.title')}{' '}
                <span className="text-gradient-primary">{t('newsletter.title_highlight')}</span>
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                {t('newsletter.desc')}
              </p>
            </div>

            {/* Form */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2 py-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display font-semibold text-base">{t('newsletter.success')}</p>
                <p className="text-muted-foreground text-sm">{t('newsletter.success_desc')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                    placeholder={t('newsletter.placeholder')}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-hero whitespace-nowrap disabled:opacity-60"
                >
                  <span className="flex items-center gap-2">
                    {status === 'loading' ? t('newsletter.loading') : t('newsletter.button')}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </form>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive text-sm text-center mt-3"
              >
                {errorMsg}
              </motion.p>
            )}

            {/* Trust note */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              {t('newsletter.privacy')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
