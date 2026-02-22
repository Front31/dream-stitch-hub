import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';

const Impressum = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
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
            className="max-w-3xl mx-auto space-y-8"
          >
            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Angaben gemäß § 5 TMG</h2>
              <div className="text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">[Dein vollständiger Name / Firmenname]</p>
                <p>[Deine Straße und Hausnummer]</p>
                <p>[PLZ] [Ort]</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Kontakt</h2>
              <div className="text-muted-foreground space-y-1">
                <p>Telefon: [Deine Telefonnummer]</p>
                <p>E-Mail: <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a></p>
              </div>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Umsatzsteuer-ID</h2>
              <p className="text-muted-foreground">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                [Deine USt-IdNr., z.B. DE123456789]
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="text-muted-foreground space-y-1">
                <p>[Dein vollständiger Name]</p>
                <p>[Deine Straße und Hausnummer]</p>
                <p>[PLZ] [Ort]</p>
              </div>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Streitschlichtung</h2>
              <p className="text-muted-foreground">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-muted-foreground">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <div className="bg-secondary/50 rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Hinweis:</strong> Bitte ersetze alle Platzhalter in eckigen Klammern durch deine
                tatsächlichen Daten. Für ein rechtskonformes Impressum empfehlen wir die Nutzung eines
                Impressum-Generators oder die Beratung durch einen Anwalt.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Impressum;
