import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Package, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCollectionProducts, fetchCollections, type ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

const NewArrivalsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  const [collectionHandle, setCollectionHandle] = useState('neu-eingetroffen');

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      // Find the collection by title or known handles
      const collections = await fetchCollections(20);
      const match = collections.find(c =>
        c.node.title.toLowerCase().includes('neu') ||
        c.node.handle === 'neu-eingetroffen' ||
        c.node.handle === 'new-arrivals'
      );
      if (match) {
        setCollectionHandle(match.node.handle);
        const fetched = await fetchCollectionProducts(match.node.handle, 6);
        setProducts(fetched);
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant || !variant.availableForSale) return;
    await addItem({ product, variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: 1, selectedOptions: variant.selectedOptions || [] });
    toast.success(t('products.added_to_cart'), { description: product.node.title });
  };

  if (!isLoading && products.length === 0) return null;

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div style={{ opacity }} className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
            {t('new_arrivals.badge')}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('new_arrivals.title')} <span className="text-gradient-primary">{t('new_arrivals.title_highlight')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('new_arrivals.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div style={{ y }}>
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-6 animate-pulse">
                  <div className="aspect-square bg-secondary/50 rounded-xl mb-4" />
                  <div className="h-6 bg-secondary/50 rounded mb-2" />
                  <div className="h-4 bg-secondary/30 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product, index) => (
                <motion.div key={product.node.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-card">
                  <Link to={`/product/${product.node.handle}`}>
                    <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                      {product.node.images.edges[0]?.node ? (
                        <img src={product.node.images.edges[0].node.url} alt={product.node.images.edges[0].node.altText || product.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Package className="w-16 h-16 text-muted-foreground" /></div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">{t('new_arrivals.new_badge')}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link to={`/product/${product.node.handle}`}>
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{product.node.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.node.description || t('products.default_desc')}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-accent">{product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}</span>
                      {product.node.variants.edges[0]?.node.availableForSale ? (
                        <button onClick={() => handleAddToCart(product)} className="p-2.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors" aria-label={t('products.add_to_cart')}>
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      ) : (
                        <div className="p-2.5 text-muted-foreground relative">
                          <ShoppingCart className="w-5 h-5" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[28px] h-[2px] bg-muted-foreground rotate-[-45deg] rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <Link to={`/collection?type=${collectionHandle}`} className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            {t('new_arrivals.view_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
