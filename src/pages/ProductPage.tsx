import { motion } from 'framer-motion';
import FloatingHeader from '@/components/FloatingHeader';
import ProductDetail from '@/components/ProductDetail';
import NewsletterBanner from '@/components/NewsletterBanner';
import Footer from '@/components/Footer';

const ProductPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <FloatingHeader />
      <ProductDetail />
      <NewsletterBanner />
      <Footer />
    </motion.div>
  );
};

export default ProductPage;
