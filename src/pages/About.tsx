import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Heart, Shield, Users, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Qualität',
    description: 'Nur 100% authentische, factory sealed Produkte. Keine Kompromisse.'
  },
  {
    icon: Heart,
    title: 'Leidenschaft',
    description: 'Wir sind selbst Sammler und verstehen was echte Fans wollen.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Eine wachsende Familie von Pokémon TCG Enthusiasten.'
  },
  {
    icon: Sparkles,
    title: 'Premium Service',
    description: 'Schneller Versand, sichere Verpackung, persönlicher Support.'
  }
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <SEO
        title="Über RiFa Cards – Dein Pokémon TCG Händler"
        description="Erfahre mehr über RiFa Cards: Von Sammlern für Sammler. 100% authentische, factory sealed Pokémon TCG Produkte."
        canonical="/about"
      />
      <FloatingHeader />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
              Über uns
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Die Geschichte hinter <span className="text-gradient-primary">RiFa Cards</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              RiFa Cards entstand aus der Leidenschaft für Pokémon Trading Cards.
              Was als Hobby begann, wurde zur Mission: Sammlern Zugang zu den besten
              sealed Produkten zu ermöglichen.
            </p>
          </motion.div>
        </section>

        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Von Sammlern, <span className="text-gradient-accent">für Sammler</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Alles begann mit der Frage: Wo bekommt man zuverlässig authentische,
                    sealed Pokémon Produkte? Die Antwort war oft frustrierend –
                    überteuerte Preise, fragwürdige Quellen, oder einfach nicht verfügbar.
                  </p>
                  <p>
                    Deshalb haben wir RiFa Cards gegründet. Ein Shop, der das bietet,
                    was wir selbst als Sammler immer gesucht haben: Qualität, Vertrauen,
                    und eine Auswahl, die das Herz höher schlagen lässt.
                  </p>
                  <p>
                    Jedes Produkt in unserem Sortiment ist handverlesen. Wir arbeiten
                    nur mit verifizierten Distributoren und garantieren 100% Authentizität.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/10 to-secondary rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-6xl font-bold text-primary mb-2">100%</div>
                    <div className="text-muted-foreground">Sealed & Authentisch</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Unsere Werte
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Das sind die Grundsätze, die uns jeden Tag antreiben.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border"
                >
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
              {[
                { value: '1000+', label: 'Zufriedene Kunden' },
                { value: '100%', label: 'Sealed Produkte' },
                { value: '24h', label: 'Versand' },
                { value: '5★', label: 'Bewertung' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
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
