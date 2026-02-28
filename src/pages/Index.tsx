import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Box, ShieldCheck, Zap, Package } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import NewsletterBanner from '@/components/NewsletterBanner';
import NewArrivalsSection from '@/components/NewArrivalsSection';
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
      const targetHandles = ['pokemon', 'one-piece', 'magic-the-gathering'];
      const filtered = data.filter((c) => targetHandles.some((h) => c.node.handle.toLowerCase().includes(h)));
      setCollections(filtered.slice(0, 3));
      setCollectionsLoading(false);
    };
    load();
  }, []);

  const fallbackCategories = [
  { title: t('index.cat_displays'), description: t('index.cat_displays_desc'), icon: Box, link: '/collection?type=booster-displays' },
  { title: t('index.cat_etb'), description: t('index.cat_etb_desc'), icon: Star, link: '/collection?type=elite-trainer-boxen' },
  { title: t('index.cat_special'), description: t('index.cat_special_desc'), icon: Zap, link: '/collection?type=special-collections' }];


  const stats = [
  { number: '100%', label: t('page.about.stat_sealed'), icon: ShieldCheck },
  { number: '24h', label: t('index.shipping_label'), icon: Zap },
  { number: '1000+', label: t('page.about.stat_customers'), icon: Star },
  { number: '5★', label: t('page.about.stat_rating'), icon: Star }];


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen relative">
      <SEO
        title={locale === 'en' ? 'RiFa Cards – Premium TCG Products | Factory Sealed' : 'RiFa Cards – Premium TCG Produkte | Factory Sealed'}
        description={locale === 'en' ? 'Your shop for factory sealed TCG products.' : 'Dein Shop für factory sealed TCG Produkte.'}
        canonical="/"
        jsonLd={organizationJsonLd} />

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
        <NewArrivalsSection />

        {/* Why RiFa Section */}
        




















        {/* Categories Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">{t('index.categories_badge')}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t('index.categories_title')} <span className="text-gradient-accent text-primary">{t('index.categories_title_highlight')}</span></h2>
            </motion.div>
            {collectionsLoading ?
            <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) =>
              <div key={i} className="bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-3xl p-8 border border-border animate-pulse">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/50 mb-6" />
                    <div className="h-6 bg-secondary/50 rounded mb-3 w-2/3" />
                    <div className="h-4 bg-secondary/30 rounded mb-2" />
                    <div className="h-4 bg-secondary/30 rounded w-1/2" />
                  </div>
              )}
              </div> :
            collections.length > 0 ?
            <div className={`grid gap-8 ${collections.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : collections.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'}`}>
                {collections.map((collection, index) =>
              <motion.div key={collection.node.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <Link to={`/collection?type=${collection.node.handle}`} className="block group">
                      <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card h-full">
                        {collection.node.image?.url ?
                    <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden">
                            <img src={collection.node.image.url} alt={collection.node.image.altText || collection.node.title} className="w-full h-full object-contain p-1" />
                          </div> :

                    <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Package className="w-7 h-7 text-primary" />
                          </div>
                    }
                        <h3 className="font-display text-xl font-bold mb-3">{collection.node.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{collection.node.description || ''}</p>
                        <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">{t('index.discover')} <ArrowRight className="w-4 h-4" /></span>
                      </div>
                    </Link>
                  </motion.div>
              )}
              </div> :

            <div className="grid md:grid-cols-3 gap-8">
                {fallbackCategories.map((category, index) =>
              <motion.div key={category.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <Link to={category.link} className="block group">
                      <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card h-full">
                        <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><category.icon className="w-7 h-7 text-primary" /></div>
                        <h3 className="font-display text-xl font-bold mb-3">{category.title}</h3>
                        <p className="text-muted-foreground mb-4">{category.description}</p>
                        <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">{t('index.discover')} <ArrowRight className="w-4 h-4" /></span>
                      </div>
                    </Link>
                  </motion.div>
              )}
              </div>
            }
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterBanner />
      </main>

      <Footer />
    </motion.div>);

};

export default Index;