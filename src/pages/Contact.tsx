import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Clock, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const EMAILJS_SERVICE_ID = 'service_nqe86jm';
const EMAILJS_TEMPLATE_NOTIFY = 'template_ngwv4wu';
const EMAILJS_TEMPLATE_CONFIRM = 'template_j6siluo';
const EMAILJS_PUBLIC_KEY = 'Dm-DfN6Xpxkip75sw';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const templateParams = {
      to_email: 'info@rifacards.de',
      from_name: formData.get('name') as string,
      from_email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY, templateParams, EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CONFIRM, templateParams, EMAILJS_PUBLIC_KEY);

      toast.success('Nachricht gesendet!', {
        description: 'Wir melden uns so schnell wie möglich bei dir. Du erhältst eine Bestätigung per E-Mail.'
      });
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Fehler beim Senden', {
        description: 'Bitte versuche es erneut oder schreibe uns direkt an info@rifacards.de'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Kontakt
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Wir sind <span className="text-gradient-primary">für dich da</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Hast du Fragen zu unseren Produkten oder deiner Bestellung?
              Wir helfen dir gerne weiter.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Kontaktmöglichkeiten</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">E-Mail</h3>
                      <a href="mailto:info@rifacards.de" className="text-accent hover:underline">
                        info@rifacards.de
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Antwortzeit</h3>
                      <p className="text-muted-foreground">
                        In der Regel innerhalb von 24 Stunden
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Social Media</h3>
                      <p className="text-muted-foreground">
                        Folge uns für Updates und exklusive Drops
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-lg mb-3">FAQ</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Viele Fragen werden bereits in unseren FAQs beantwortet.
                </p>
                <Button variant="outline" asChild>
                  <a href="/faq">Zu den FAQs</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold mb-6">Nachricht senden</h2>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required placeholder="Dein Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input id="email" name="email" type="email" required placeholder="deine@email.de" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Betreff</Label>
                    <Input id="subject" name="subject" required placeholder="Worum geht es?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Deine Nachricht an uns..."
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Contact;
