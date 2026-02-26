import { motion } from 'framer-motion';
import { Loader2, Truck, Package, RefreshCw, Shield, Clock, MapPin } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopPolicies } from '@/hooks/useShopifyContent';

const ShippingHighlights = () => (
  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
    {[
      { icon: Clock, title: 'Schneller Versand', description: 'Bestellungen bis 14 Uhr werden noch am selben Werktag versendet.', highlight: '24h Versand' },
      { icon: Package, title: 'Premium Verpackung', description: 'Extra Polsterung und stabile Kartons für maximalen Schutz.', highlight: 'Sorgfältig verpackt' },
      { icon: Shield, title: 'Versichert', description: 'Jedes Paket ist vollständig versichert gegen Verlust und Beschädigung.', highlight: '100% Absicherung' },
    ].map((item, index) => (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-card border border-border rounded-2xl p-6 text-center"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <item.icon className="w-7 h-7 text-primary" />
        </div>
        <div className="text-xs font-medium text-accent mb-2">{item.highlight}</div>
        <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </motion.div>
    ))}
  </div>
);

const ShippingFallbackContent = () => (
  <>
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-3xl mx-auto mb-16">
      <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
        <Truck className="w-6 h-6 text-primary" />Versandkosten
      </h2>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="text-left p-4 font-medium">Land</th>
              <th className="text-left p-4 font-medium">Kosten</th>
              <th className="text-left p-4 font-medium">Lieferzeit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr><td className="p-4">Deutschland</td><td className="p-4"><span className="font-semibold">4,99 €</span><span className="text-sm text-muted-foreground ml-2">(ab 100€ kostenlos)</span></td><td className="p-4">1-3 Werktage</td></tr>
            <tr><td className="p-4">Österreich</td><td className="p-4"><span className="font-semibold">7,99 €</span><span className="text-sm text-muted-foreground ml-2">(ab 150€ kostenlos)</span></td><td className="p-4">2-4 Werktage</td></tr>
            <tr><td className="p-4">Schweiz</td><td className="p-4"><span className="font-semibold">12,99 €</span></td><td className="p-4">3-5 Werktage</td></tr>
          </tbody>
        </table>
      </div>
    </motion.section>

    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-3xl mx-auto mb-16">
      <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
        <RefreshCw className="w-6 h-6 text-primary" />Rückgabe & Widerruf
      </h2>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-2">14 Tage Widerrufsrecht</h3>
          <p className="text-muted-foreground">Du hast das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Rückgabebedingungen</h3>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-start gap-2"><span className="text-primary">•</span>Produkte müssen ungeöffnet und im Originalzustand sein</li>
            <li className="flex items-start gap-2"><span className="text-primary">•</span>Die Originalverpackung muss unbeschädigt sein</li>
            <li className="flex items-start gap-2"><span className="text-primary">•</span>Rücksendung innerhalb von 14 Tagen nach Erhalt</li>
          </ul>
        </div>
      </div>
    </motion.section>

    <div className="max-w-3xl mx-auto bg-secondary/50 rounded-2xl p-6">
      <p className="text-sm text-muted-foreground">
        <strong>Hinweis:</strong> Hinterlege deine Versand- und Rückgaberichtlinien in den Shopify-Einstellungen
        unter Einstellungen → Richtlinien, damit sie hier automatisch angezeigt werden.
      </p>
    </div>
  </>
);

const Shipping = () => {
  const { policies, isLoading } = useShopPolicies();
  const shippingPolicy = policies?.shippingPolicy;
  const refundPolicy = policies?.refundPolicy;
  const hasShopifyContent = shippingPolicy?.body || refundPolicy?.body;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <SEO title="Versand und Rückgabe – RiFa Cards" description="Informationen zu Versandkosten, Lieferzeiten und Rückgabebedingungen bei RiFa Cards." canonical="/shipping" />
      <FloatingHeader />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">Versand & Rückgabe</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Sicher & <span className="text-gradient-primary">schnell</span> zu dir</h1>
            <p className="text-lg text-muted-foreground">Wir behandeln jedes Produkt mit größter Sorgfalt. Premium Verpackung, schneller Versand, volle Absicherung.</p>
          </motion.div>

          <ShippingHighlights />

          {/* Versandkosten-Tabelle – immer sichtbar */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
              <Truck className="w-6 h-6 text-primary" />Versandkosten
            </h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Land</th>
                    <th className="text-left p-4 font-medium">Kosten</th>
                    <th className="text-left p-4 font-medium">Lieferzeit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-4">Deutschland</td><td className="p-4"><span className="font-semibold">4,99 €</span><span className="text-sm text-muted-foreground ml-2">(ab 100€ kostenlos)</span></td><td className="p-4">1-3 Werktage</td></tr>
                  <tr><td className="p-4">Österreich</td><td className="p-4"><span className="font-semibold">7,99 €</span><span className="text-sm text-muted-foreground ml-2">(ab 150€ kostenlos)</span></td><td className="p-4">2-4 Werktage</td></tr>
                  <tr><td className="p-4">Schweiz</td><td className="p-4"><span className="font-semibold">12,99 €</span></td><td className="p-4">3-5 Werktage</td></tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Shopify-Richtlinien oder Fallback */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : hasShopifyContent ? (
            <div className="max-w-3xl mx-auto space-y-12">
              {shippingPolicy?.body && (
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-primary" />Versandrichtlinie
                  </h2>
                  <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                    <ShopifyHtmlContent html={shippingPolicy.body} />
                  </div>
                </motion.section>
              )}
              {refundPolicy?.body && (
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                    <RefreshCw className="w-6 h-6 text-primary" />Rückgabe & Widerruf
                  </h2>
                  <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                    <ShopifyHtmlContent html={refundPolicy.body} />
                  </div>
                </motion.section>
              )}
            </div>
          ) : (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                <RefreshCw className="w-6 h-6 text-primary" />Rückgabe & Widerruf
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">14 Tage Widerrufsrecht</h3>
                  <p className="text-muted-foreground">Du hast das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Rückgabebedingungen</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2"><span className="text-primary">•</span>Produkte müssen ungeöffnet und im Originalzustand sein</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span>Die Originalverpackung muss unbeschädigt sein</li>
                    <li className="flex items-start gap-2"><span className="text-primary">•</span>Rücksendung innerhalb von 14 Tagen nach Erhalt</li>
                  </ul>
                </div>
              </div>
            </motion.section>
          )}

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="max-w-3xl mx-auto mt-12">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />Sendungsverfolgung
            </h2>
            <div className="bg-secondary/50 rounded-2xl p-6">
              <p className="text-muted-foreground mb-4">Nach dem Versand erhältst du automatisch eine E-Mail mit deiner Sendungsnummer.</p>
              <p className="text-sm text-muted-foreground">Wir versenden mit DHL und DPD – beide bieten dir die Möglichkeit, die Lieferung flexibel umzuleiten oder an einen Paketshop zu senden.</p>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Shipping;
