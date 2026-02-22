import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCollectionProducts, fetchProducts, type ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const FeaturedSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      // Try featured collection first, fallback to all products
      let fetchedProducts = await fetchCollectionProducts('startseite', 6);
      if (fetchedProducts.length === 0) {
        fetchedProducts = await fetchCollectionProducts('featured', 6);
      }
      if (fetchedProducts.length === 0) {
        fetchedProducts = await fetchProducts(6);
      }
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant || !variant.availableForSale) return;

    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });

    toast.success('Zum Warenkorb hinzugefügt!', {
      description: product.node.title
    });
  };

  return (
    <section
      id="featured"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          style={{ opacity }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4"
          >
            Highlights
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Ausgewählte <span className="text-gradient-primary">Produkte</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Unsere handverlesene Auswahl der begehrtesten Sealed Produkte.
            Jede Box ein potenzieller Schatz.
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
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">Keine Produkte verfügbar</h3>
              <p className="text-muted-foreground">
                Erstelle Produkte über den Chat, um sie hier anzuzeigen.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-card"
                >
                  <Link to={`/product/${product.node.handle}`}>
                    <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                      {product.node.images.edges[0]?.node ? (
                        <img
                          src={product.node.images.edges[0].node.url}
                          alt={product.node.images.edges[0].node.altText || product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                          Sealed
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link to={`/product/${product.node.handle}`}>
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {product.node.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {product.node.description || 'Premium Pokémon TCG Sealed Produkt'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-accent">
                        {product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </span>
                      {product.node.variants.edges[0]?.node.availableForSale ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                        >
                          In den Warenkorb
                        </button>
                      ) : (
                        <span className="px-4 py-2 text-sm font-medium text-destructive">
                          Ausverkauft
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Alle Produkte ansehen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
