import { motion } from 'framer-motion';
import { Shield, Package, Truck, CreditCard } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    title: '100% Authentisch',
    description: 'Nur offizielle Pokémon TCG Produkte'
  },
  {
    icon: Package,
    title: 'Sealed & OVP',
    description: 'Factory sealed, ungeöffnet'
  },
  {
    icon: Truck,
    title: 'Schneller Versand',
    description: 'Versand innerhalb 24h'
  },
  {
    icon: CreditCard,
    title: 'Sicherer Kauf',
    description: 'Verschlüsselte Zahlung'
  }
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-background border border-primary/20 shadow-soft mb-4"
              >
                <item.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-sm md:text-base mb-1">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
