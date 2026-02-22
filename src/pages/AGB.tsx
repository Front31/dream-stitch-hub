import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const AGB = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <SEO
        title="AGB – RiFa Cards"
        description="Allgemeine Geschäftsbedingungen von RiFa Cards für den Kauf von Pokémon TCG Produkten."
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
            className="max-w-3xl mx-auto space-y-8"
          >
            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">§ 1 Geltungsbereich</h2>
              <p className="text-muted-foreground">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen, die über den
                Online-Shop <strong>RiFa Cards</strong> (rifacards.de) abgeschlossen werden. Betreiber des
                Shops ist [Dein vollständiger Name / Firmenname], [Deine Adresse].
              </p>
              <p className="text-muted-foreground">
                Es gelten ausschließlich diese AGB. Abweichende Bedingungen des Kunden werden nicht
                anerkannt, es sei denn, wir stimmen ihrer Geltung ausdrücklich schriftlich zu.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">§ 2 Vertragsschluss</h2>
              <p className="text-muted-foreground">
                Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar,
                sondern eine unverbindliche Aufforderung, Waren zu bestellen.
              </p>
              <p className="text-muted-foreground">
                Mit dem Absenden der Bestellung gibst du ein verbindliches Angebot zum Kauf der im
                Warenkorb enthaltenen Waren ab. Der Kaufvertrag kommt zustande, wenn wir deine Bestellung
                durch eine Auftragsbestätigung per E-Mail annehmen.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">§ 3 Preise und Zahlung</h2>
              <p className="text-muted-foreground">
                Alle angegebenen Preise sind Endpreise inklusive der gesetzlichen Mehrwertsteuer.
                Versandkosten werden gesondert ausgewiesen und sind auf unserer Seite{' '}
                <a href="/shipping" className="text-accent hover:underline">Versand & Rückgabe</a>{' '}
                einsehbar.
              </p>
              <p className="text-muted-foreground">
                Wir bieten folgende Zahlungsarten an: PayPal, Klarna und Kreditkarte.
                Die Zahlung ist sofort mit Bestellung fällig.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">§ 4 Lieferung</h2>
              <p className="text-muted-foreground">
                Die Lieferung erfolgt an die von dir bei der Bestellung angegebene Lieferadresse.
                Bestellungen bis 14 Uhr werden in der Regel am selben Werktag versendet.
              </p>
              <p className="text-muted-foreground">
                Lieferzeiten: Deutschland 1–3 Werktage, Österreich 2–4 Werktage, Schweiz 3–5 Werktage.
                Die genauen Versandkosten findest du auf unserer Versandseite.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">§ 5 Widerrufsrecht</h2>
              <p className="text-muted-foreground">
                Du hast das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
                Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem du oder ein von dir benannter Dritter
                die Waren in Besitz genommen hat.
              </p>
              <p className="text-muted-foreground">
                Um dein Widerrufsrecht auszuüben, sende uns eine E-Mail an{' '}
                <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a>{' '}
                mit einer eindeutigen Erklärung über deinen Entschluss, den Vertrag zu widerrufen.
              </p>
              <p className="text-muted-foreground">
                <strong>Rückgabebedingungen:</strong> Die Waren müssen ungeöffnet, unbeschädigt und im
                Originalzustand zurückgesendet werden. Bei versiegelten Produkten (Sealed Pokémon TCG)
                erlischt das Widerrufsrecht, wenn die Versiegelung entfernt wurde.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">§ 6 Gewährleistung</h2>
              <p className="text-muted-foreground">
                Es gelten die gesetzlichen Gewährleistungsrechte. Solltest du einen Mangel feststellen,
                kontaktiere uns bitte umgehend unter{' '}
                <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a>.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">§ 7 Haftung</h2>
              <p className="text-muted-foreground">
                Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit
                haften wir nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und
                beschränkt auf den vorhersehbaren, vertragstypischen Schaden.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">§ 8 Schlussbestimmungen</h2>
              <p className="text-muted-foreground">
                Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der
                übrigen Bestimmungen unberührt.
              </p>
            </section>

            <div className="bg-secondary/50 rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Hinweis:</strong> Bitte ersetze alle Platzhalter in eckigen Klammern durch deine
                tatsächlichen Daten. Für rechtskonforme AGB empfehlen wir die Nutzung eines AGB-Generators
                (z.B. eRecht24) oder die Beratung durch einen Anwalt.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default AGB;
