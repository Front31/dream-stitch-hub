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
        <p className="font-semibold text-foreground">RiFa Cards</p>
        <p>Inhaber: [Name wird über Shopify gepflegt]</p>
        <p>E-Mail: <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a></p>
      </div>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">Kontakt</h2>
      <div className="text-muted-foreground space-y-1">
        <p>E-Mail: <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a></p>
      </div>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">Umsatzsteuer-Identifikationsnummer</h2>
      <p className="text-muted-foreground">gemäß § 27 a Umsatzsteuergesetz: wird nachgereicht</p>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">Streitschlichtung</h2>
      <div className="text-muted-foreground space-y-2">
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">Haftung für Inhalte</h2>
      <p className="text-muted-foreground">Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">Haftung für Links</h2>
      <p className="text-muted-foreground">Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
    </section>
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
              <ShopifyHtmlContent html={page.body} />
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
