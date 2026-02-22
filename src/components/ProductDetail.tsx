import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Shield, Package, Check, Info, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProductByHandle } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const addItem = useCartStore(state => state.addItem);
  const isAddingToCart = useCartStore(state => state.isLoading);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setIsLoading(true);
      const fetchedProduct = await fetchProductByHandle(handle);
      setProduct(fetchedProduct);
      setIsLoading(false);
    };
    loadProduct();
  }, [handle]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold mb-4">Produkt nicht gefunden</h1>
          <Link to="/collection" className="text-primary hover:underline">
            Zurück zu den Produkten
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants.edges[selectedVariant]?.node;
  const price = currentVariant?.price || product.priceRange.minVariantPrice;
  const mainImage = product.images.edges[selectedImage]?.node || product.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!currentVariant) return;

    await addItem({
      product: { node: product },
      variantId: currentVariant.id,
      variantTitle: currentVariant.title,
      price: currentVariant.price,
      quantity: 1,
      selectedOptions: currentVariant.selectedOptions || []
    });

    toast.success('Zum Warenkorb hinzugefügt!', {
      description: product.title
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu den Produkten
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="aspect-square bg-secondary/30 rounded-3xl overflow-hidden border border-border relative group/img">
                {mainImage ? (
                  <motion.img
                    key={selectedImage}
                    src={mainImage.url}
                    alt={mainImage.altText || product.title}
                    className="w-full h-full object-contain p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-20 h-20 text-muted-foreground" />
                  </div>
                )}

                {/* Prev/Next arrows */}
                {product.images.edges.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => prev === 0 ? product.images.edges.length - 1 : prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-background"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => prev === product.images.edges.length - 1 ? 0 : prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-background"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="absolute top-4 left-4">
                <Badge className="bg-accent text-accent-foreground px-3 py-1 text-sm">
                  <Check className="w-3 h-3 mr-1" />
                  Sealed
                </Badge>
              </div>

              {product.images.edges.length > 1 && (
                <div className="flex gap-3 mt-4 justify-center">
                  {product.images.edges.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Sealed Produkt
              </Badge>
              {currentVariant?.availableForSale && (
                <Badge variant="outline" className="bg-energy-grass/10 text-energy-grass border-energy-grass/20">
                  <Check className="w-3 h-3 mr-1" />
                  Auf Lager
                </Badge>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {product.title}
            </h1>

            {product.description && (
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-4xl font-bold text-accent">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </span>
            </div>

            {product.variants.edges.length > 1 && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Variante wählen</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((variant, index) => (
                    <button
                      key={variant.node.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedVariant === index
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {variant.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg"
                disabled={!currentVariant?.availableForSale || isAddingToCart}
                onClick={handleAddToCart}
              >
                {isAddingToCart ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    In den Warenkorb
                  </>
                )}
              </Button>
            </div>

            <div className="bg-secondary/50 rounded-xl p-4 mb-8 border border-border">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Sealed Produkt</p>
                  <p className="text-xs text-muted-foreground">
                    Dieses Produkt ist original versiegelt (Factory Sealed).
                    Es werden keine Einzelkarten verkauft – nur komplette, ungeöffnete Displays und Boxen.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">100% Authentisch</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-sm">Sicher verpackt</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
