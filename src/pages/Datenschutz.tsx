import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopPolicies } from '@/hooks/useShopifyContent';

const DatenschutzFallback = () => (
  <div className="space-y-8">
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">1. Verantwortlicher</h2>
      <div className="text-muted-foreground space-y-1">
        <p>[Dein vollständiger Name / Firmenname]</p>
        <p>[Deine Straße und Hausnummer]</p>
        <p>[PLZ] [Ort]</p>
        <p>E-Mail: <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a></p>
      </div>
    </section>
    <div className="bg-secondary/50 rounded-2xl p-6">
      <p className="text-sm text-muted-foreground">
        <strong>Hinweis:</strong> Hinterlege deine Datenschutzerklärung in den Shopify-Einstellungen unter
        Einstellungen → Richtlinien → Datenschutzerklärung, damit sie hier automatisch angezeigt wird.
      </p>
    </div>
  </div>
);

const Datenschutz = () => {
  const { policies, isLoading } = useShopPolicies();
  const policy = policies?.privacyPolicy;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <SEO
        title="Datenschutzerklärung – RiFa Cards"
        description="Datenschutzerklärung und Informationen zum Umgang mit deinen Daten bei RiFa Cards."
        canonical="/datenschutz"
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
              Datenschutz
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
