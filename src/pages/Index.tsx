import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap, Package } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import NewsletterBanner from '@/components/NewsletterBanner';
import { fetchCollections, type ShopifyCollection } from '@/lib/shopify';

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RiFa Cards",
  "url": "https://rifacards.de",
  "description": "Dein Shop für factory sealed TCG Produkte.",
  "contactPoint": { "@type": "ContactPoint", "email": "info@rifacards.de", "contactType": "customer service" }
};

const Index = () => {
  const { t, locale } = useTranslation();
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setCollectionsLoading(true);
      const data = await fetchCollections(10);
      setCollections(data);
      setCollectionsLoading(false);
    };
    load();
  }, []);

  const stats = [
    { number: '100%', label: t('page.about.stat_sealed'), icon: ShieldCheck },
    { number: '24h', label: t('index.shipping_label'), icon: Zap },
    { number: '1000+', label: t('page.about.stat_customers'), icon: Star },
    { number: '5★', label: t('page.about.stat_rating'), icon: Star },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen relative">
      <SEO
        title={locale === 'en' ? 'RiFa Cards – Premium TCG Products | Factory Sealed' : 'RiFa Cards – Premium TCG Produkte | Factory Sealed'}
        description={locale === 'en' ? 'Your shop for factory sealed TCG products.' : 'Dein Shop für factory sealed TCG Produkte.'}
        canonical="/"
        jsonLd={organizationJsonLd}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="page-grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#page-grid)" />
        </svg>
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] bg-accent/[0.12] rounded-full blur-3xl" />
        <div className="absolute top-[28%] left-[50%] w-[450px] h-[450px] bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute top-[55%] right-[20%] w-[500px] h-[500px] bg-secondary/[0.12] rounded-full blur-3xl" />
        <div className="absolute top-[55%] left-[30%] w-[350px] h-[350px] bg-highlight/[0.06] rounded-full blur-3xl" />
        <div className="absolute top-[85%] left-[40%] w-[600px] h-[600px] bg-secondary/[0.12] rounded-full blur-3xl" />
      </div>
      <FloatingHeader />

      <main>
        <HeroSection />
        <FeaturedSection />
        <TrustSection />

        {/* Categories Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">{t('index.categories_badge')}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t('index.categories_title')} <span className="text-gradient-accent text-primary">{t('index.categories_title_highlight')}</span></h2>
            </motion.div>
            {collectionsLoading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-secondary/20 rounded-3xl p-8 border border-border animate-pulse">
                    <div className="w-14 h-14 bg-secondary/40 rounded-2xl mb-6" />
                    <div className="h-6 bg-secondary/40 rounded mb-3 w-3/4" />
                    <div className="h-4 bg-secondary/30 rounded w-full mb-2" />
                    <div className="h-4 bg-secondary/30 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : collections.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('products.no_products')}</p>
              </div>
            ) : (
              <div className={`grid gap-8 ${collections.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : collections.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'}`}>
                {collections.map((col, index) => (
                  <motion.div key={col.node.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <Link to={`/collection?type=${col.node.handle}`} className="block group">
                      <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-3xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card h-full overflow-hidden">
                        {col.node.image?.url ? (
                          <div className="aspect-[16/9] overflow-hidden">
                            <img src={col.node.image.url} alt={col.node.image.altText || col.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="aspect-[16/9] bg-secondary/20 flex items-center justify-center">
                            <Package className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="p-8">
                          <h3 className="font-display text-xl font-bold mb-3">{col.node.title}</h3>
                          {col.node.description && <p className="text-muted-foreground mb-4 line-clamp-2">{col.node.description}</p>}
                          <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">{t('index.discover')} <ArrowRight className="w-4 h-4" /></span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why RiFa Section */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="inline-block text-sm font-medium uppercase tracking-widest mb-4 opacity-80">{t('index.why_badge')}</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t('index.why_title')}</h2>
                <p className="text-lg opacity-90 mb-8">{t('index.why_desc')}</p>
                <Link to="/about" className="btn-secondary inline-flex bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">{t('index.more_about')}</Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid sm:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="font-display text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="opacity-80 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brand statement */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">{t('index.collectors_title')} <span className="text-gradient-accent">{t('index.collectors_highlight')}</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t('index.collectors_desc')}</p>
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="text-center"><div className="font-display text-3xl font-bold text-primary mb-1">100%</div><div>Sealed</div></div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center"><div className="font-display text-3xl font-bold text-primary mb-1">Premium</div><div>{t('index.shipping_label')}</div></div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center"><div className="font-display text-3xl font-bold text-primary mb-1">24h</div><div>{t('index.delivery_label')}</div></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterBanner />
      </main>

      <Footer />
    </motion.div>
  );
};

export default Index;
