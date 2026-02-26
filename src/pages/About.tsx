import { motion } from 'framer-motion';
import { Heart, Shield, Users, Sparkles, Loader2 } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopifyPage } from '@/hooks/useShopifyContent';
import { useTranslation } from '@/hooks/useTranslation';

const About = () => {
  const { page, isLoading } = useShopifyPage('about');
  const { t, locale } = useTranslation();

  const values = [
    { icon: Shield, title: t('page.about.value_quality'), description: t('page.about.value_quality_desc') },
    { icon: Heart, title: t('page.about.value_passion'), description: t('page.about.value_passion_desc') },
    { icon: Users, title: t('page.about.value_community'), description: t('page.about.value_community_desc') },
    { icon: Sparkles, title: t('page.about.value_service'), description: t('page.about.value_service_desc') },
  ];

  const stats = [
    { value: '1000+', label: t('page.about.stat_customers') },
    { value: '100%', label: t('page.about.stat_sealed') },
    { value: '24h', label: t('page.about.stat_shipping') },
    { value: '5★', label: t('page.about.stat_rating') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <SEO
        title={locale === 'en' ? 'About RiFa Cards – Your TCG Dealer' : 'Über RiFa Cards – Dein TCG Händler'}
        description={locale === 'en' ? 'Learn more about RiFa Cards: By collectors, for collectors.' : 'Erfahre mehr über RiFa Cards: Von Sammlern für Sammler.'}
        canonical="/about"
      />
      <FloatingHeader />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-6 mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">{t('page.about.badge')}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              {t('page.about.title')} <span className="text-gradient-primary">RiFa Cards</span>
            </h1>
          </motion.div>
        </section>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : page?.body ? (
          <section className="container mx-auto px-6 mb-20">
            <div className="max-w-3xl mx-auto">
              <ShopifyHtmlContent html={page.body} />
            </div>
          </section>
        ) : (
          <section className="bg-secondary/30 py-20 mb-20">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                    {t('page.about.fallback_title')} <span className="text-gradient-accent">{t('page.about.fallback_title_accent')}</span>
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{t('page.about.fallback_p1')}</p>
                    <p>{t('page.about.fallback_p2')}</p>
                    <p>{t('page.about.fallback_p3')}</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/10 to-secondary rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-display text-6xl font-bold text-primary mb-2">100%</div>
                      <div className="text-muted-foreground">{t('page.about.sealed_authentic')}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('page.about.values_title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('page.about.values_subtitle')}</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center p-6 rounded-2xl bg-card border border-border">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="font-display text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default About;
