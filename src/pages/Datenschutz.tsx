import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopPolicies } from '@/hooks/useShopifyContent';
import { useTranslation } from '@/hooks/useTranslation';

const DatenschutzFallback = () => (
  <div className="space-y-8">
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">1. Verantwortlicher</h2>
      <div className="text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">RiFa Cards</p>
        <p>E-Mail: <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a></p>
      </div>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">2. Erhebung und Speicherung personenbezogener Daten</h2>
      <div className="text-muted-foreground space-y-2">
        <p>Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst (Server-Logfiles).</p>
        <p>Bei einer Bestellung erheben wir folgende Daten: Name, Adresse, E-Mail-Adresse und Zahlungsinformationen.</p>
      </div>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">3. Cookies</h2>
      <p className="text-muted-foreground">Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen.</p>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">4. Ihre Rechte</h2>
      <div className="text-muted-foreground space-y-2">
        <p>Sie haben jederzeit das Recht auf Auskunft über die bei uns zu Ihrer Person gespeicherten Daten.</p>
        <p>Wenden Sie sich hierzu bitte an: <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a></p>
      </div>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">5. Zahlungsanbieter</h2>
      <p className="text-muted-foreground">Wir nutzen externe Zahlungsdienstleister (z.B. Shopify Payments, PayPal).</p>
    </section>
  </div>
);

const Datenschutz = () => {
  const { policies, isLoading } = useShopPolicies();
  const policy = policies?.privacyPolicy;
  const { t, locale } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <SEO
        title={locale === 'en' ? 'Privacy Policy – RiFa Cards' : 'Datenschutzerklärung – RiFa Cards'}
        description={locale === 'en' ? 'Privacy policy and data handling information at RiFa Cards.' : 'Datenschutzerklärung und Informationen zum Umgang mit deinen Daten bei RiFa Cards.'}
        canonical="/datenschutz"
      />
      <FloatingHeader />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">{t('page.legal.badge')}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">{t('page.datenschutz.title')}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
            ) : policy?.body ? (
              <ShopifyHtmlContent html={policy.body} />
            ) : (
              <DatenschutzFallback />
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Datenschutz;
