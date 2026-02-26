import { motion } from 'framer-motion';
import { Loader2, Truck, Package, RefreshCw, Shield, Clock, MapPin } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopPolicies } from '@/hooks/useShopifyContent';
import { useTranslation } from '@/hooks/useTranslation';

const Shipping = () => {
  const { policies, isLoading } = useShopPolicies();
  const shippingPolicy = policies?.shippingPolicy;
  const refundPolicy = policies?.refundPolicy;
  const { t, locale } = useTranslation();

  const highlights = [
    { icon: Clock, title: t('page.shipping.fast_shipping'), description: t('page.shipping.fast_shipping_desc'), highlight: t('page.shipping.fast_shipping_highlight') },
    { icon: Package, title: t('page.shipping.premium_packaging'), description: t('page.shipping.premium_packaging_desc'), highlight: t('page.shipping.premium_packaging_highlight') },
    { icon: Shield, title: t('page.shipping.insured'), description: t('page.shipping.insured_desc'), highlight: t('page.shipping.insured_highlight') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <SEO
        title={locale === 'en' ? 'Shipping & Returns – RiFa Cards' : 'Versand und Rückgabe – RiFa Cards'}
        description={locale === 'en' ? 'Information about shipping costs, delivery times and return policy at RiFa Cards.' : 'Informationen zu Versandkosten, Lieferzeiten und Rückgabebedingungen bei RiFa Cards.'}
        canonical="/shipping"
      />
      <FloatingHeader />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">{t('page.shipping.badge')}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              {t('page.shipping.title')} <span className="text-gradient-primary">{t('page.shipping.title_highlight')}</span> {t('page.shipping.title_suffix')}
            </h1>
            <p className="text-lg text-muted-foreground">{t('page.shipping.subtitle')}</p>
          </motion.div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {highlights.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-xs font-medium text-accent mb-2">{item.highlight}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Shipping costs table */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
              <Truck className="w-6 h-6 text-primary" />{t('page.shipping.costs_title')}
            </h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-4 font-medium">{t('page.shipping.country')}</th>
                    <th className="text-left p-4 font-medium">{t('page.shipping.cost')}</th>
                    <th className="text-left p-4 font-medium">{t('page.shipping.delivery_time')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-4">{locale === 'en' ? 'Germany' : 'Deutschland'}</td>
                    <td className="p-4"><span className="font-semibold">4,99 €</span><span className="text-sm text-muted-foreground ml-2">({locale === 'en' ? 'free over €100' : 'ab 100€ kostenlos'})</span></td>
                    <td className="p-4">{locale === 'en' ? '1-3 business days' : '1-3 Werktage'}</td>
                  </tr>
                  <tr>
                    <td className="p-4">{locale === 'en' ? 'Austria' : 'Österreich'}</td>
                    <td className="p-4"><span className="font-semibold">7,99 €</span><span className="text-sm text-muted-foreground ml-2">({locale === 'en' ? 'free over €150' : 'ab 150€ kostenlos'})</span></td>
                    <td className="p-4">{locale === 'en' ? '2-4 business days' : '2-4 Werktage'}</td>
                  </tr>
                  <tr>
                    <td className="p-4">{locale === 'en' ? 'Switzerland' : 'Schweiz'}</td>
                    <td className="p-4"><span className="font-semibold">12,99 €</span></td>
                    <td className="p-4">{locale === 'en' ? '3-5 business days' : '3-5 Werktage'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Shopify policies */}
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-12">
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" />{t('page.shipping.policy_title')}
                </h2>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  {shippingPolicy?.body ? (
                    <ShopifyHtmlContent html={shippingPolicy.body} />
                  ) : (
                    <div className="space-y-4 text-muted-foreground">
                      <p>{locale === 'en' ? 'Orders placed before 2:00 PM are shipped the same business day. We ship with DHL and DPD – insured and with tracking.' : 'Bestellungen, die bis 14:00 Uhr eingehen, werden noch am selben Werktag versendet. Wir versenden mit DHL und DPD – versichert und mit Sendungsverfolgung.'}</p>
                      <p>{locale === 'en' ? 'After shipping, you will automatically receive an email with your tracking number.' : 'Nach dem Versand erhältst du automatisch eine E-Mail mit deiner Tracking-Nummer, über die du dein Paket jederzeit verfolgen kannst.'}</p>
                    </div>
                  )}
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-primary" />{t('page.shipping.returns_title')}
                </h2>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  {refundPolicy?.body ? (
                    <ShopifyHtmlContent html={refundPolicy.body} />
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">{locale === 'en' ? '14-Day Right of Withdrawal' : '14 Tage Widerrufsrecht'}</h3>
                        <p className="text-muted-foreground">{locale === 'en' ? 'You have the right to withdraw from this contract within 14 days without giving any reason.' : 'Du hast das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
            </div>
          )}

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="max-w-3xl mx-auto mt-12">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />{t('page.shipping.tracking_title')}
            </h2>
            <div className="bg-secondary/50 rounded-2xl p-6">
              <p className="text-muted-foreground mb-4">{t('page.shipping.tracking_desc')}</p>
              <p className="text-sm text-muted-foreground">{t('page.shipping.tracking_sub')}</p>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Shipping;
