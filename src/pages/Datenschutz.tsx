import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';

const Datenschutz = () => {
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
              Datenschutz
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">1. Verantwortlicher</h2>
              <div className="text-muted-foreground space-y-1">
                <p>[Dein vollständiger Name / Firmenname]</p>
                <p>[Deine Straße und Hausnummer]</p>
                <p>[PLZ] [Ort]</p>
                <p>E-Mail: <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a></p>
              </div>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">2. Erhebung und Speicherung personenbezogener Daten</h2>
              <p className="text-muted-foreground">
                Beim Besuch unserer Website werden automatisch Informationen durch den Browser übermittelt
                und in sogenannten Server-Log-Dateien gespeichert. Dies umfasst Browsertyp und -version,
                verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der
                Serveranfrage und IP-Adresse.
              </p>
              <p className="text-muted-foreground">
                Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten
                mit anderen Datenquellen wird nicht vorgenommen.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">3. Kontaktformular & E-Mail (EmailJS)</h2>
              <p className="text-muted-foreground">
                Wenn du unser Kontaktformular nutzt, werden deine Angaben (Name, E-Mail-Adresse, Nachricht)
                über den Dienst <strong>EmailJS</strong> verarbeitet und per E-Mail an uns übermittelt.
                Die Daten werden ausschließlich zur Bearbeitung deiner Anfrage verwendet und nicht an
                Dritte weitergegeben.
              </p>
              <p className="text-muted-foreground">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f
                DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">4. Cookies</h2>
              <p className="text-muted-foreground">
                Unsere Website verwendet nur technisch notwendige Cookies, die für den Betrieb der Seite
                erforderlich sind (z.B. Warenkorb-Funktion). Es werden keine Tracking- oder Analyse-Cookies
                verwendet.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">5. Zahlungsanbieter</h2>
              <p className="text-muted-foreground">
                Für die Abwicklung von Zahlungen nutzen wir die Dienste von Shopify Payments
                (PayPal, Klarna, Kreditkarte). Bei einer Bestellung werden die für die Zahlungsabwicklung
                erforderlichen Daten an den jeweiligen Zahlungsdienstleister übermittelt.
              </p>
              <p className="text-muted-foreground">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">6. Hosting</h2>
              <p className="text-muted-foreground">
                Unsere Website wird bei [Hosting-Anbieter, z.B. Lovable / Netlify / Vercel] gehostet.
                Der Hoster erhebt in sog. Logfiles Daten, die dein Browser übermittelt.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">7. Deine Rechte</h2>
              <p className="text-muted-foreground">Du hast jederzeit das Recht auf:</p>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <strong>Auskunft</strong> über deine gespeicherten Daten (Art. 15 DSGVO)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <strong>Löschung</strong> deiner Daten (Art. 17 DSGVO)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)
                </li>
              </ul>
              <p className="text-muted-foreground">
                Wende dich dazu an: <a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a>
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">8. Beschwerderecht</h2>
              <p className="text-muted-foreground">
                Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
                deiner personenbezogenen Daten zu beschweren.
              </p>
            </section>

            <div className="bg-secondary/50 rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Hinweis:</strong> Bitte ersetze alle Platzhalter in eckigen Klammern durch deine
                tatsächlichen Daten. Für eine rechtskonforme Datenschutzerklärung empfehlen wir die Nutzung
                eines Generators (z.B. eRecht24) oder die Beratung durch einen Anwalt.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Datenschutz;
