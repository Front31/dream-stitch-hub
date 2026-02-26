import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ShopifyHtmlContent from '@/components/ShopifyHtmlContent';
import { useShopifyPage } from '@/hooks/useShopifyContent';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fallbackFaqs = [
  {
    category: 'Produkte',
    questions: [
      { q: 'Sind alle Produkte wirklich sealed?', a: 'Ja, absolut! Wir verkaufen ausschließlich factory sealed Produkte.' },
      { q: 'Verkauft ihr auch Einzelkarten?', a: 'Nein, wir konzentrieren uns ausschließlich auf sealed Produkte.' },
      { q: 'Woher bezieht ihr eure Produkte?', a: 'Wir arbeiten nur mit autorisierten Distributoren zusammen.' },
      { q: 'Welche Editionen bietet ihr an?', a: 'Wir führen aktuelle Releases sowie ausgewählte ältere Editionen.' },
    ]
  },
  {
    category: 'Versand & Lieferung',
    questions: [
      { q: 'Wie schnell wird meine Bestellung versendet?', a: 'Bestellungen bis 14 Uhr werden noch am selben Werktag versendet.' },
      { q: 'Wie werden die Produkte verpackt?', a: 'Wir verwenden spezielle Kartons mit extra Polsterung.' },
      { q: 'Liefert ihr auch international?', a: 'Aktuell liefern wir nach Deutschland, Österreich und in die Schweiz.' },
      { q: 'Was kostet der Versand?', a: 'Innerhalb Deutschlands: 4,99€. Ab 100€ versandkostenfrei!' },
    ]
  },
  {
    category: 'Zahlung & Rückgabe',
    questions: [
      { q: 'Welche Zahlungsmethoden akzeptiert ihr?', a: 'Kreditkarte, PayPal, Klarna, Apple Pay, Google Pay und SEPA-Lastschrift.' },
      { q: 'Kann ich meine Bestellung zurückgeben?', a: '14-tägiges Widerrufsrecht. Produkte müssen ungeöffnet und im Originalzustand sein.' },
      { q: 'Was ist, wenn mein Paket beschädigt ankommt?', a: 'Dokumentiere die Beschädigung mit Fotos und kontaktiere uns sofort.' },
    ]
  }
];

const FAQ = () => {
  const { page, isLoading } = useShopifyPage('faq');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": fallbackFaqs.flatMap(section =>
      section.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": { "@type": "Answer", "text": q.a }
      }))
    )
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <SEO
        title="Häufige Fragen – RiFa Cards TCG Shop"
        description="Antworten auf häufige Fragen zu Bestellung, Versand, Produkten und Rückgabe bei RiFa Cards."
        canonical="/faq"
        jsonLd={jsonLd}
      />
      <FloatingHeader />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">FAQ</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Häufig gestellte <span className="text-gradient-primary">Fragen</span>
            </h1>
            <p className="text-lg text-muted-foreground">Hier findest du Antworten auf die wichtigsten Fragen.</p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          ) : page?.body ? (
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8">
              <ShopifyHtmlContent html={page.body} />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-12">
              {fallbackFaqs.map((section, sectionIndex) => (
                <motion.div key={section.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionIndex * 0.1 }}>
                  <h2 className="font-display text-2xl font-bold mb-6 text-primary">{section.category}</h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {section.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${section.category}-${index}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30">
                        <AccordionTrigger className="text-left font-medium hover:no-underline py-5">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-5">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="max-w-xl mx-auto text-center mt-16 p-8 bg-secondary/50 rounded-2xl">
            <h3 className="font-display text-xl font-bold mb-3">Noch Fragen?</h3>
            <p className="text-muted-foreground mb-6">Keine Sorge, wir helfen dir gerne persönlich weiter.</p>
            <a href="/contact" className="btn-hero inline-flex"><span>Kontakt aufnehmen</span></a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default FAQ;
