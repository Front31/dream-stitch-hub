import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import { fetchProducts, type ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Package, Loader2, ShoppingCart } from 'lucide-react';

const Collection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isAddingToCart = useCartStore(state => state.isLoading);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await fetchProducts(50);
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <FloatingHeader />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">
              Shop
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Die <span className="text-gradient-primary">Sammlung</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entdecke unsere kuratierte Auswahl an sealed Pokémon TCG Produkten.
              Jedes Produkt ist original versiegelt und 100% authentisch.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-card rounded-2xl border border-border"
            >
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-2">Keine Produkte verfügbar</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Produkte werden geladen...
              </p>
            </motion.div>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground mb-8"
              >
                {products.length} Produkte gefunden
              </motion.p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/product/${product.node.handle}`}
                      className="group block bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-card"
                    >
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

                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                            Sealed
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={isAddingToCart}
                          className="absolute bottom-3 right-3 p-3 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                          aria-label="Zum Warenkorb hinzufügen"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-5">
                        <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {product.node.title}
                        </h3>

                        {product.node.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {product.node.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-accent">
                            {product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                          </span>

                          {product.node.variants.edges[0]?.node.availableForSale ? (
                            <span className="text-xs text-primary font-medium">Auf Lager</span>
                          ) : (
                            <span className="text-xs text-destructive font-medium">Ausverkauft</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Collection;
