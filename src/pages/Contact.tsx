import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Clock, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

const EMAILJS_SERVICE_ID = 'service_nqe86jm';
const EMAILJS_TEMPLATE_NOTIFY = 'template_ngwv4wu';
const EMAILJS_TEMPLATE_CONFIRM = 'template_j6siluo';
const EMAILJS_PUBLIC_KEY = 'Dm-DfN6Xpxkip75sw';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, locale } = useTranslation();

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
      toast.success(t('contact.success'), { description: t('contact.success_desc') });
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error(t('contact.error'), { description: t('contact.error_desc') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <SEO
        title={locale === 'en' ? 'Contact – RiFa Cards' : 'Kontakt – RiFa Cards'}
        description={locale === 'en' ? 'Get in touch with RiFa Cards. We are happy to help with questions about orders and products.' : 'Nimm Kontakt mit RiFa Cards auf. Wir helfen dir gerne bei Fragen zu Bestellungen und Produkten.'}
        canonical="/contact"
      />
      <FloatingHeader />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">{t('contact.badge')}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">{t('contact.title')} <span className="text-gradient-primary">{t('contact.title_highlight')}</span></h1>
            <p className="text-lg text-muted-foreground">{t('contact.subtitle')}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">{t('contact.options_title')}</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Mail className="w-5 h-5 text-primary" /></div>
                    <div><h3 className="font-semibold mb-1">{t('contact.email')}</h3><a href="mailto:info@rifacards.de" className="text-accent hover:underline">info@rifacards.de</a></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Clock className="w-5 h-5 text-primary" /></div>
                    <div><h3 className="font-semibold mb-1">{t('contact.response_time')}</h3><p className="text-muted-foreground">{t('contact.response_time_desc')}</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-primary" /></div>
                    <div><h3 className="font-semibold mb-1">{t('contact.social')}</h3><p className="text-muted-foreground">{t('contact.social_desc')}</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-lg mb-3">FAQ</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('contact.faq_hint')}</p>
                <Button variant="outline" asChild><a href="/faq">{t('contact.go_to_faq')}</a></Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold mb-6">{t('contact.form_title')}</h2>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="name">{t('contact.name')}</Label><Input id="name" name="name" required placeholder={t('contact.name_placeholder')} /></div>
                    <div className="space-y-2"><Label htmlFor="email">{t('contact.email')}</Label><Input id="email" name="email" type="email" required placeholder={t('contact.email_placeholder')} /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="subject">{t('contact.subject')}</Label><Input id="subject" name="subject" required placeholder={t('contact.subject_placeholder')} /></div>
                  <div className="space-y-2"><Label htmlFor="message">{t('contact.message')}</Label><Textarea id="message" name="message" required placeholder={t('contact.message_placeholder')} rows={5} /></div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? t('contact.sending') : t('contact.send')}
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
