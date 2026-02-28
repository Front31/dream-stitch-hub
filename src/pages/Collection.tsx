import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import FloatingHeader from '@/components/FloatingHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { fetchProducts, fetchCollectionProducts, type ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Package, Loader2, ShoppingCart, Search, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useShopifyMenu } from '@/hooks/useShopifyContent';
import NewsletterBanner from '@/components/NewsletterBanner';

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get('type') || '';
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const addItem = useCartStore(state => state.addItem);
  const isAddingToCart = useCartStore(state => state.isLoading);
  const { t, locale } = useTranslation();

  // Pull filter items from Shopify menu "produktfilter"
  const { navItems: filterItems, isLoading: filtersLoading } = useShopifyMenu('produktfilter');

  // Extract collection handle from path like "/collection?type=xyz"
  const filters = useMemo(() => filterItems.map(item => {
    const match = item.path.match(/[?&]type=([^&]+)/);
    const handle = match ? match[1] : '';
    return { label: item.label, handle };
  }).filter(f => f.handle), [filterItems]);

  // Find active filter for title/description
  const activeFilter = filters.find(f => f.handle === activeType);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      let fetchedProducts: ShopifyProduct[];
      if (activeType) { fetchedProducts = await fetchCollectionProducts(activeType); } else { fetchedProducts = await fetchProducts(50); }
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, [activeType]);

  const handleCategoryClick = (handle: string) => {
    if (handle === activeType) { setSearchParams({}); } else { setSearchParams({ type: handle }); }
  };

  const handleAddToCart = async (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({ product, variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: 1, selectedOptions: variant.selectedOptions || [] });
    toast.success(t('products.added_to_cart'), { description: product.node.title });
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(p =>
      p.node.title.toLowerCase().includes(q) ||
      (p.node.description && p.node.description.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  const pageTitle = activeFilter?.label || `${t('collection.title')} ${t('collection.title_highlight')}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <SEO
        title={locale === 'en' ? 'Buy TCG Products – RiFa Cards' : 'TCG Produkte kaufen – RiFa Cards'}
        description={locale === 'en' ? 'Discover our range of sealed TCG products.' : 'Entdecke unser Sortiment an sealed TCG Produkten.'}
        canonical="/collection"
      />
      <FloatingHeader />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-widest mb-4">{t('collection.badge')}</span>
             <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {activeType ? <span className="text-gradient-primary">{activeFilter?.label || activeType}</span> : <>{t('collection.title')} <span className="text-gradient-primary">{t('collection.title_highlight')}</span></>}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('collection.default_desc')}</p>
          </motion.div>

          {!filtersLoading && filters.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center gap-3 mb-6">
              <button onClick={() => setSearchParams({})} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${!activeType ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'}`}>
                {t('footer.all_products')}
              </button>
              {filters.map((filter) => (
                <button key={filter.handle} onClick={() => handleCategoryClick(filter.handle)} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeType === filter.handle ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'}`}>
                  {filter.label}
                </button>
              ))}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="relative max-w-md mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full h-11 pl-11 pr-10 rounded-full border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary transition-colors" aria-label={t('search.clear')}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : filteredProducts.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 bg-card rounded-2xl border border-border">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-2">{searchQuery ? t('search.no_results', { query: searchQuery }) : t('products.no_products')}</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">{activeType ? t('products.no_products_category') : t('products.loading')}</p>
              {searchQuery ? (
                <button onClick={() => setSearchQuery('')} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">{t('search.clear')}</button>
              ) : activeType ? (
                <button onClick={() => setSearchParams({})} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">{t('products.show_all')}</button>
              ) : null}
            </motion.div>
          ) : (
            <>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mb-8">
                {t('products.found', { count: filteredProducts.length.toString() })}
              </motion.p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.node.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-card">
                      <Link to={`/product/${product.node.handle}`}>
                        <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                          {product.node.images.edges[0]?.node ? (
                            <img src={product.node.images.edges[0].node.url} alt={product.node.images.edges[0].node.altText || product.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="eager" crossOrigin="anonymous" onError={(e) => { const target = e.currentTarget; target.style.display = 'none'; const fallback = target.nextElementSibling as HTMLElement; if (fallback) fallback.style.display = 'flex'; }} />
                          ) : null}
                          <div className={`w-full h-full items-center justify-center absolute inset-0 ${product.node.images.edges[0]?.node ? 'hidden' : 'flex'}`}><Package className="w-16 h-16 text-muted-foreground" /></div>
                          <div className="absolute top-4 left-4">
                            {product.node.variants.edges[0]?.node.availableForSale ? (
                              <span className="px-3 py-1 bg-energy-grass text-white text-xs font-semibold rounded-full">{t('products.in_stock')}</span>
                            ) : (
                              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">{t('products.sold_out')}</span>
                            )}
                          </div>
                        </div>
                      </Link>
                      <div className="p-6">
                        <Link to={`/product/${product.node.handle}`}><h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{product.node.title}</h3></Link>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.node.description || t('products.default_desc')}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-accent">{product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}</span>
                          {product.node.variants.edges[0]?.node.availableForSale ? (
                            <button onClick={(e) => handleAddToCart(product, e)} disabled={isAddingToCart} className="p-2.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50" aria-label={t('products.add_to_cart')}>
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <NewsletterBanner />
      <Footer />
    </motion.div>
  );
};

export default Collection;
