import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopifyPage } from '@/hooks/useShopifyContent';

const ImpressumFallback = () => (
  <div className="space-y-8">
    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">Angaben gemäß § 5 TMG</h2>
      <div className="text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">[Dein vollständiger Name / Firmenname]</p>
        <p>[Deine Straße und Hausnummer]</p>
        <p>[PLZ] [Ort]</p>
        <p>Deutschland</p>
      </div>
    </section>
    <div className="bg-secondary/50 rounded-2xl p-6">
      <p className="text-sm text-muted-foreground">
        <strong>Hinweis:</strong> Erstelle eine Seite mit dem Handle „impressum" in deinem Shopify-Admin
        unter Online-Shop → Seiten, damit der Inhalt hier automatisch angezeigt wird.
      </p>
    </div>
  </div>
);

const Impressum = () => {
  const { page, isLoading } = useShopifyPage('impressum');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <SEO
        title="Impressum – RiFa Cards"
        description="Impressum und rechtliche Angaben von RiFa Cards."
        canonical="/impressum"
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
              Impressum
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
            ) : page?.body ? (
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <ShopifyHtmlContent html={page.body} />
              </div>
            ) : (
              <ImpressumFallback />
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Impressum;
