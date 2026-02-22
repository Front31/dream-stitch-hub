import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: 'Produkte',
    questions: [
      {
        q: 'Sind alle Produkte wirklich sealed?',
        a: 'Ja, absolut! Wir verkaufen ausschließlich factory sealed Produkte. Jedes Produkt wird vor dem Versand geprüft und ist originalverpackt. Wir garantieren 100% Authentizität.'
      },
      {
        q: 'Verkauft ihr auch Einzelkarten?',
        a: 'Nein, wir konzentrieren uns ausschließlich auf sealed Produkte wie Booster Displays, Elite Trainer Boxen und Special Collections. Keine Einzelkarten, keine Repacks.'
      },
      {
        q: 'Woher bezieht ihr eure Produkte?',
        a: 'Wir arbeiten nur mit autorisierten Distributoren und offiziellen TCG-Händlern zusammen. So können wir die Authentizität jedes Produkts garantieren.'
      },
      {
        q: 'Welche Editionen bietet ihr an?',
        a: 'Wir führen aktuelle Releases sowie ausgewählte ältere Editionen. Unser Sortiment wird regelmäßig aktualisiert. Folge uns für Updates zu neuen Drops!'
      }
    ]
  },
  {
    category: 'Versand & Lieferung',
    questions: [
      {
        q: 'Wie schnell wird meine Bestellung versendet?',
        a: 'Bestellungen, die bis 14 Uhr eingehen, werden noch am selben Werktag versendet. Die Lieferzeit beträgt in der Regel 1-3 Werktage innerhalb Deutschlands.'
      },
      {
        q: 'Wie werden die Produkte verpackt?',
        a: 'Wir verwenden spezielle Kartons mit extra Polsterung, um deine Produkte optimal zu schützen. Sealed Produkte bleiben sealed – ohne Kratzer oder Beschädigungen.'
      },
      {
        q: 'Liefert ihr auch international?',
        a: 'Aktuell liefern wir nach Deutschland, Österreich und in die Schweiz. Weitere Länder sind in Planung.'
      },
      {
        q: 'Was kostet der Versand?',
        a: 'Innerhalb Deutschlands: 4,99€ (versicherter Versand). Ab 100€ Bestellwert liefern wir versandkostenfrei!'
      }
    ]
  },
  {
    category: 'Zahlung & Rückgabe',
    questions: [
      {
        q: 'Welche Zahlungsmethoden akzeptiert ihr?',
        a: 'Wir akzeptieren alle gängigen Zahlungsmethoden: Kreditkarte, PayPal, Klarna, Apple Pay, Google Pay und SEPA-Lastschrift.'
      },
      {
        q: 'Kann ich meine Bestellung zurückgeben?',
        a: 'Du hast ein 14-tägiges Widerrufsrecht. Produkte müssen ungeöffnet und im Originalzustand sein. Bei Fragen kontaktiere uns einfach.'
      },
      {
        q: 'Was ist, wenn mein Paket beschädigt ankommt?',
        a: 'Bitte dokumentiere die Beschädigung mit Fotos und kontaktiere uns sofort. Wir finden gemeinsam eine Lösung – deine Zufriedenheit ist uns wichtig.'
      }
    ]
  }
];

const FAQ = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <SEO
        title="Häufige Fragen – RiFa Cards TCG Shop"
        description="Antworten auf häufige Fragen zu Bestellung, Versand, Produkten und Rückgabe bei RiFa Cards."
        canonical="/faq"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.flatMap(section =>
            section.questions.map(q => ({
              "@type": "Question",
              "name": q.q,
              "acceptedAnswer": { "@type": "Answer", "text": q.a }
            }))
          )
        }}
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
              FAQ
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Häufig gestellte <span className="text-gradient-primary">Fragen</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Hier findest du Antworten auf die wichtigsten Fragen rund um
              unseren Shop, Versand und Produkte.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-12">
            {faqs.map((section, sectionIndex) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h2 className="font-display text-2xl font-bold mb-6 text-primary">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {section.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${section.category}-${index}`}
                      className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-xl mx-auto text-center mt-16 p-8 bg-secondary/50 rounded-2xl"
          >
            <h3 className="font-display text-xl font-bold mb-3">
              Noch Fragen?
            </h3>
            <p className="text-muted-foreground mb-6">
              Keine Sorge, wir helfen dir gerne persönlich weiter.
            </p>
            <a href="/contact" className="btn-hero inline-flex">
              <span>Kontakt aufnehmen</span>
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default FAQ;
