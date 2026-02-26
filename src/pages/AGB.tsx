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
      <p className="text-muted-foreground">Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen über den Online-Shop <strong>RiFa Cards</strong> (rifacards.de). Mit der Bestellung erklären Sie sich mit diesen AGB einverstanden.</p>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 2 Vertragsschluss</h2>
      <p className="text-muted-foreground">Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar. Durch Anklicken des Buttons „Kaufen" geben Sie eine verbindliche Bestellung ab. Die Bestätigung des Zugangs der Bestellung erfolgt per E-Mail. Der Kaufvertrag kommt mit Versand der Ware zustande.</p>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 3 Preise und Zahlung</h2>
      <div className="text-muted-foreground space-y-2">
        <p>Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer, zuzüglich Versandkosten.</p>
        <p>Wir akzeptieren folgende Zahlungsarten: Kreditkarte, PayPal, Klarna und weitere über Shopify Payments angebotene Zahlungsmethoden.</p>
      </div>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 4 Lieferung</h2>
      <p className="text-muted-foreground">Die Lieferung erfolgt an die von Ihnen angegebene Lieferadresse. Bestellungen, die bis 14:00 Uhr eingehen, werden noch am selben Werktag versendet. Die Lieferzeit beträgt in der Regel 1-3 Werktage innerhalb Deutschlands.</p>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 5 Widerrufsrecht</h2>
      <div className="text-muted-foreground space-y-2">
        <p>Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter die Ware in Besitz genommen haben.</p>
        <p>Um Ihr Widerrufsrecht auszuüben, senden Sie uns eine E-Mail an <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a>.</p>
      </div>
    </section>

    <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-bold">§ 6 Gewährleistung</h2>
      <p className="text-muted-foreground">Es gelten die gesetzlichen Gewährleistungsrechte. Alle Produkte sind factory sealed und 100% authentisch. Bei Mängeln wenden Sie sich bitte an unseren Kundenservice.</p>
    </section>
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
