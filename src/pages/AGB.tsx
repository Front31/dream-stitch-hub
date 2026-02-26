import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopPolicies } from '@/hooks/useShopifyContent';

const AGBFallback = () => (
  <div className="space-y-8">
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 1 Geltungsbereich</h2>
      <p className="text-muted-foreground">
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen über den
        Online-Shop <strong>RiFa Cards</strong> (rifacards.de).
      </p>
    </section>
    <div className="bg-secondary/50 rounded-2xl p-6">
      <p className="text-sm text-muted-foreground">
        <strong>Hinweis:</strong> Hinterlege deine AGB in den Shopify-Einstellungen unter
        Einstellungen → Richtlinien → Nutzungsbedingungen, damit sie hier automatisch angezeigt werden.
      </p>
    </div>
  </div>
);

const AGB = () => {
  const { policies, isLoading } = useShopPolicies();
  const policy = policies?.termsOfService;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <SEO
        title="AGB – RiFa Cards"
        description="Allgemeine Geschäftsbedingungen von RiFa Cards für den Kauf von TCG Produkten."
        canonical="/agb"
      />
      <FloatingHeader />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
              Rechtliches
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Allgemeine Geschäftsbedingungen
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : policy?.body ? (
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <ShopifyHtmlContent html={policy.body} />
              </div>
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
