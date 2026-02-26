import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopPolicies } from '@/hooks/useShopifyContent';
import { useTranslation } from '@/hooks/useTranslation';

const AGBFallback = () => (
  <div className="space-y-8">
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 1 Geltungsbereich</h2>
      <p className="text-muted-foreground">Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen über den Online-Shop <strong>RiFa Cards</strong> (rifacards.de).</p>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 2 Vertragsschluss</h2>
      <p className="text-muted-foreground">Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar.</p>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 3 Preise und Zahlung</h2>
      <p className="text-muted-foreground">Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer, zuzüglich Versandkosten.</p>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 4 Lieferung</h2>
      <p className="text-muted-foreground">Die Lieferung erfolgt an die von Ihnen angegebene Lieferadresse.</p>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 5 Widerrufsrecht</h2>
      <p className="text-muted-foreground">Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
    </section>
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 6 Gewährleistung</h2>
      <p className="text-muted-foreground">Es gelten die gesetzlichen Gewährleistungsrechte. Alle Produkte sind factory sealed und 100% authentisch.</p>
    </section>
  </div>
);

const AGB = () => {
  const { policies, isLoading } = useShopPolicies();
  const policy = policies?.termsOfService;
  const { t, locale } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <SEO
        title={locale === 'en' ? 'Terms & Conditions – RiFa Cards' : 'AGB – RiFa Cards'}
        description={locale === 'en' ? 'Terms and conditions of RiFa Cards for purchasing TCG products.' : 'Allgemeine Geschäftsbedingungen von RiFa Cards für den Kauf von TCG Produkten.'}
        canonical="/agb"
      />
      <FloatingHeader />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">{t('page.legal.badge')}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">{t('page.agb.title')}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
            ) : policy?.body ? (
              <ShopifyHtmlContent html={policy.body} />
            ) : (
              <AGBFallback />
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default AGB;
