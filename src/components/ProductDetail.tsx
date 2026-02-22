import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Shield, Package, Check, Info, Loader2, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { fetchProductByHandle } from '@/lib/shopify';
import SEO from '@/components/SEO';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface MediaItem {
  type: 'image' | 'video' | 'external_video';
  url: string;
  alt: string | null;
  thumbnailUrl?: string;
  mimeType?: string;
  embeddedUrl?: string;
}

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
  media?: {
    edges: Array<{
      node: {
        mediaContentType: string;
        alt: string | null;
        image?: { url: string; altText: string | null };
        sources?: Array<{ url: string; mimeType: string }>;
        embeddedUrl?: string;
        host?: string;
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

function buildMediaItems(product: ProductNode): MediaItem[] {
  if (product.media?.edges?.length) {
    return product.media.edges.map((edge) => {
      const node = edge.node;
      if (node.mediaContentType === 'VIDEO' && node.sources?.length) {
        return {
          type: 'video' as const,
          url: node.sources[0].url,
          mimeType: node.sources[0].mimeType,
          alt: node.alt,
          thumbnailUrl: node.image?.url,
        };
      }
      if (node.mediaContentType === 'EXTERNAL_VIDEO') {
        return {
          type: 'external_video' as const,
          url: node.embeddedUrl || '',
          alt: node.alt,
          embeddedUrl: node.embeddedUrl,
          thumbnailUrl: node.image?.url,
        };
      }
      return {
        type: 'image' as const,
        url: node.image?.url || '',
        alt: node.image?.altText || node.alt,
      };
    }).filter(item => item.url);
  }
  // Fallback to images
  return product.images.edges.map((edge) => ({
    type: 'image' as const,
    url: edge.node.url,
    alt: edge.node.altText,
  }));
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
  const mediaItems = buildMediaItems(product);
  const currentMedia = mediaItems[selectedImage] || mediaItems[0];

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

  const renderMainMedia = () => {
    if (!currentMedia) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Package className="w-20 h-20 text-muted-foreground" />
        </div>
      );
    }

    if (currentMedia.type === 'video') {
      return (
        <video
          key={selectedImage}
          src={currentMedia.url}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain"
        />
      );
    }

    if (currentMedia.type === 'external_video') {
      const embedUrl = currentMedia.embeddedUrl || currentMedia.url;
      // Convert YouTube/Vimeo URLs to embed format
      let src = embedUrl;
      if (embedUrl.includes('youtube.com/watch')) {
        const videoId = new URL(embedUrl).searchParams.get('v');
        src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      } else if (embedUrl.includes('youtu.be/')) {
        const videoId = embedUrl.split('youtu.be/')[1]?.split('?')[0];
        src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      } else if (embedUrl.includes('vimeo.com/')) {
        const videoId = embedUrl.split('vimeo.com/')[1]?.split('?')[0];
        src = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      }
      return (
        <iframe
          key={selectedImage}
          src={src}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <motion.img
        key={selectedImage}
        src={currentMedia.url}
        alt={currentMedia.alt || product.title}
        className="w-full h-full object-contain p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    );
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.images.edges[0]?.node.url,
    "offers": {
      "@type": "Offer",
      "price": parseFloat(price.amount).toFixed(2),
      "priceCurrency": price.currencyCode,
      "availability": currentVariant?.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "url": `https://rifacards.de/product/${handle}`
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <SEO
        title={`${product.title} kaufen – RiFa Cards`}
        description={product.description?.substring(0, 155) || `${product.title} – Factory Sealed TCG Produkt bei RiFa Cards kaufen.`}
        canonical={`/product/${handle}`}
        type="product"
        image={product.images.edges[0]?.node.url}
        jsonLd={productJsonLd}
      />
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
                {renderMainMedia()}

                {/* Prev/Next arrows */}
                {mediaItems.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => prev === 0 ? mediaItems.length - 1 : prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-background z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => prev === mediaItems.length - 1 ? 0 : prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-background z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-accent text-accent-foreground px-3 py-1 text-sm">
                  <Check className="w-3 h-3 mr-1" />
                  Sealed
                </Badge>
              </div>

              {mediaItems.length > 1 && (
                <div className="flex gap-3 mt-4 justify-center flex-wrap">
                  {mediaItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors relative ${
                        selectedImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.alt || `${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          {item.thumbnailUrl ? (
                            <img
                              src={item.thumbnailUrl}
                              alt={item.alt || `Video ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-secondary flex items-center justify-center">
                              <Play className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play className="w-4 h-4 text-white" fill="white" />
                          </div>
                        </>
                      )}
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
