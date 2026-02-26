import { motion } from 'framer-motion';
import { Shield, Package, Truck, CreditCard } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const TrustSection = () => {
  const { t } = useTranslation();

  const trustItems = [
    { icon: Shield, title: t('trust.authentic'), description: t('trust.authentic_desc') },
    { icon: Package, title: t('trust.sealed'), description: t('trust.sealed_desc') },
    { icon: Truck, title: t('trust.fast_shipping'), description: t('trust.fast_shipping_desc') },
    { icon: CreditCard, title: t('trust.secure'), description: t('trust.secure_desc') },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-background border border-primary/20 shadow-soft mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-sm md:text-base mb-1">{item.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
