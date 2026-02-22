import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Box, ShieldCheck, Zap } from 'lucide-react';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="page-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16">

              <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
                Kategorien
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Was suchst du <span className="text-gradient-accent text-primary">heute?</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
              {
                title: 'Booster Displays',
                description: '36 Booster Packs pro Display. Das Herz jeder Kollektion.',
                icon: Box,
                color: 'from-secondary/30 to-secondary/10',
                link: '/collection?type=booster-displays'
              },
              {
                title: 'Elite Trainer Boxen',
                description: 'Das komplette Paket: Booster, Zubehör und exklusive Promos.',
                icon: Star,
                color: 'from-secondary/30 to-secondary/10',
                link: '/collection?type=elite-trainer-boxen'
              },
              {
                title: 'Special Collections',
                description: 'Limitierte Boxen mit einzigartigen Inhalten und Promos.',
                icon: Zap,
                color: 'from-secondary/30 to-secondary/10',
                link: '/collection?type=special-collections'
              }].
              map((category, index) =>
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}>

                  <Link
                  to={category.link}
                  className="block group">

                    <div className={`bg-gradient-to-br ${category.color} rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card h-full`}>
                      <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <category.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-display text-xl font-bold mb-3">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        Entdecken <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Why RiFa Section */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}>

                <span className="inline-block text-sm font-medium uppercase tracking-widest mb-4 opacity-80">
                  Warum RiFa Cards
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                  Dein vertrauenswürdiger Partner für TCG Produkte
                </h2>
                <p className="text-lg opacity-90 mb-8">
                  Bei uns bekommst du keine Kompromisse. Jedes Produkt ist factory sealed,
                  jede Bestellung wird mit Premium-Verpackung versendet, und unser Kundenservice
                  ist immer für dich da.
                </p>
                <Link to="/about" className="btn-secondary inline-flex bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Mehr über uns
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-6">

                {[
                { number: '100%', label: 'Sealed Produkte', icon: ShieldCheck },
                { number: '24h', label: 'Versand', icon: Zap },
                { number: '1000+', label: 'Zufriedene Kunden', icon: Star },
                { number: '5★', label: 'Bewertung', icon: Star }].
                map((stat, index) =>
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center">

                    <div className="font-display text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="opacity-80 text-sm">{stat.label}</div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brand statement */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto">

              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Für echte <span className="text-gradient-accent">Sammler</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                RiFa Cards ist mehr als ein Shop – es ist eine kuratierte Auswahl
                für Kenner. Wir verkaufen ausschließlich factory sealed Produkte:
                Booster Displays, Elite Trainer Boxen und Special Collections.
                Keine Einzelkarten, keine Kompromisse.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-primary mb-1">100%</div>
                  <div>Sealed</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-primary mb-1">Premium</div>
                  <div>Versand</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-primary mb-1">24h</div>
                  <div>Lieferung</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>

              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Bereit für dein nächstes <span className="text-gradient-primary">Abenteuer?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Entdecke jetzt unsere Produkte und finde das perfekte für dich.
              </p>
              <Link to="/collection" className="btn-hero inline-flex">
                <span className="flex items-center gap-2">
                  Jetzt entdecken
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>);

};

export default Index;