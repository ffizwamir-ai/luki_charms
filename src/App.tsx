import { useState, useEffect } from 'react';
import { Product, Review } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutForm from './components/CheckoutForm';
import FAQSection from './components/FAQSection';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { Sparkles, ShoppingBag, Heart, ShieldAlert, Award, Truck, ShieldCheck, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  // Global product list
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Navigation / Drawer Open states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  
  // Custom screen routing states (mutually exclusive primary screen covers)
  const [adminActive, setAdminActive] = useState(false);
  const [checkoutActive, setCheckoutActive] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const [faqsActive, setFaqsActive] = useState(false);

  // Load initial products from database backend API
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to connect to full-stack API, using local fallbacks:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Load local cart and wishlist cache
    const savedCart = localStorage.getItem('luki-cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
    const savedWishlist = localStorage.getItem('luki-wishlist');
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) {}
    }
  }, []);

  // Save cart & wishlist changes to local cache
  const saveCartToCache = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('luki-cart', JSON.stringify(newCart));
  };

  const saveWishlistToCache = (newWishlist: Product[]) => {
    setWishlist(newWishlist);
    localStorage.setItem('luki-wishlist', JSON.stringify(newWishlist));
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    const existing = cart.find(item => item.product.id === product.id);
    let newCart: CartItem[] = [];
    if (existing) {
      newCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity }];
    }
    saveCartToCache(newCart);
    setCartOpen(true); // Open bag drawer automatically for premium visual confirmation!
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    const newCart = cart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCartToCache(newCart);
  };

  const handleRemoveFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    saveCartToCache(newCart);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlist.some(p => p.id === product.id);
    let newWishlist: Product[] = [];
    if (isSaved) {
      newWishlist = wishlist.filter(p => p.id !== product.id);
    } else {
      newWishlist = [...wishlist, product];
    }
    saveWishlistToCache(newWishlist);
  };

  // Add review callback linking back to server API
  const handleAddReview = async (productId: string, review: { author: string; rating: number; comment: string }) => {
    try {
      const res = await fetch(`/api/products/${productId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      if (res.ok) {
        // Refresh product info
        fetchProducts();
        
        // Update currently active product modal review details
        const updatedProd = await res.json();
        setActiveProduct(updatedProd);
      }
    } catch (err) {
      console.error('Failed to post review:', err);
    }
  };

  // Place order checkout callback
  const handleOrderPlaced = (orderData: any) => {
    // Empty the shopping cart after order is successfully placed
    saveCartToCache([]);
    fetchProducts(); // Refresh products to show updated stock limits!
  };

  // Search filter query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Navigation handlers
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    // Scroll down to products catalog list smoothly
    const element = document.getElementById('catalog-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close fullscreen tabs
    setCheckoutActive(false);
    setAdminActive(false);
    setAboutActive(false);
    setFaqsActive(false);
  };

  // Filters catalog list
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Category subsets for homepage sections
  const featuredProducts = products.filter(p => p.featured);
  const bestSellers = products.filter(p => p.bestSeller);
  const newArrivals = products.filter(p => p.newArrival);

  return (
    <div className="min-h-screen bg-[#0F0117] text-white font-sans flex flex-col justify-between selection:bg-pink-500/30 selection:text-pink-200 relative overflow-hidden">
      {/* Ambient glass glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0B2E] via-[#4A1D64] to-[#0F0117] opacity-65 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 1. Global Navbar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAdmin={() => {
          setAdminActive(true);
          setCheckoutActive(false);
          setAboutActive(false);
          setFaqsActive(false);
        }}
        onOpenAbout={() => {
          setAboutActive(true);
          setCheckoutActive(false);
          setAdminActive(false);
          setFaqsActive(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenFAQs={() => {
          setFaqsActive(true);
          setCheckoutActive(false);
          setAdminActive(false);
          setAboutActive(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 2. Main Content Body Router */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          {adminActive ? (
            /* Admin Panel Fullscreen Mode */
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <AdminPanel
                onClose={() => setAdminActive(false)}
                allProducts={products}
                onRefreshProducts={fetchProducts}
              />
            </motion.div>
          ) : checkoutActive ? (
            /* Checkout Screen */
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <CheckoutForm
                cart={cart}
                onClose={() => setCheckoutActive(false)}
                onOrderPlaced={handleOrderPlaced}
              />
            </motion.div>
          ) : aboutActive ? (
            /* Full About Us screen */
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <AboutUs />
              <div className="text-center pt-4">
                <button
                  onClick={() => setAboutActive(false)}
                  className="px-6 py-2.5 rounded-full bg-purple-950 hover:bg-purple-900 border border-purple-850 text-pink-300 text-xs font-semibold tracking-wide cursor-pointer transition"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          ) : faqsActive ? (
            /* Full FAQs screen */
            <motion.div
              key="faqs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <FAQSection />
              <div className="text-center pt-4">
                <button
                  onClick={() => setFaqsActive(false)}
                  className="px-6 py-2.5 rounded-full bg-purple-950 hover:bg-purple-900 border border-purple-850 text-pink-300 text-xs font-semibold tracking-wide cursor-pointer transition"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          ) : (
            /* DEFAULT HOME VIEW LAYOUT */
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Hero showcase header */}
              <Hero
                onExploreClick={() => {
                  const el = document.getElementById('catalog-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onCustomizedClick={() => {
                  setSelectedCategory('Customized');
                  const el = document.getElementById('catalog-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* 3. BEST SELLER SECTION */}
              {bestSellers.length > 0 && (
                <section className="space-y-6 text-left">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400 font-bold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-pink-500 fill-current animate-bounce" /> Certified Premium Crafts
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Best Sellers
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bestSellers.slice(0, 4).map(prod => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onViewDetails={(p) => setActiveProduct(p)}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlist.some(item => item.id === prod.id)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 4. NEW ARRIVALS SECTION */}
              {newArrivals.length > 0 && (
                <section className="space-y-6 text-left">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-current" /> Sensationally Fresh
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        New Arrivals
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {newArrivals.slice(0, 4).map(prod => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onViewDetails={(p) => setActiveProduct(p)}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlist.some(item => item.id === prod.id)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 5. FULL PRODUCT CATALOG WITH SEARCH / FILTER */}
              <section className="space-y-8 text-left scroll-mt-24" id="catalog-anchor">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-purple-950/40 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400 font-bold">
                      Exquisite Boutique Collection
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {selectedCategory === 'All' ? 'Complete Catalog' : `${selectedCategory} Bracelets`}
                    </h2>
                  </div>

                  {/* Counter info */}
                  <span className="text-xs text-purple-400 font-mono">
                    Showing {filteredProducts.length} premium charms
                  </span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="p-12 text-center bg-white/5 border border-white/10 rounded-3xl space-y-3">
                    <p className="text-sm text-purple-200 italic">No elegant charms found matching your filter criteria.</p>
                    <button
                      onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                      className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:scale-105 transition duration-300"
                    >
                      Clear Search & Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(prod => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onViewDetails={(p) => setActiveProduct(p)}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlist.some(item => item.id === prod.id)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Promo full width banner for Pakistan Shipping */}
              <div className="w-full bg-gradient-to-r from-[#4A1D64]/60 via-[#2D0A4E]/60 to-[#4A1D64]/60 border border-white/10 p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-lg">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400 font-bold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 animate-bounce text-pink-400" /> Nation-wide Elite Postage
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Delivery Available All Over Pakistan
                  </h3>
                  <p className="text-xs text-purple-200/80 max-w-xl font-sans leading-relaxed">
                    Every Luki Charms bracelet is securely packaged in bubble wrap and shipped inside our private regal velvet boutique gift boxes. Enjoy cash-on-delivery service in Karachi, Lahore, Islamabad, Faisalabad, Sialkot, Peshawar, or any other Pakistani city.
                  </p>
                </div>
                <div className="flex gap-4 sm:gap-6 items-center bg-slate-950/55 border border-white/10 p-4 rounded-2xl">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 font-mono">03095590059</span>
                    <span className="text-[9px] uppercase tracking-wider font-mono text-pink-400 font-bold block mt-0.5">24/7 Helpline</span>
                  </div>
                </div>
              </div>

              {/* Classical sections */}
              <AboutUs />
              <FAQSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Footer section */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* --- DRAWERS AND PORTAL MODALS --- */}
      
      {/* Detail Showcase Modal */}
      <AnimatePresence>
        {activeProduct && (
          <ProductDetailsModal
            product={activeProduct}
            onClose={() => setActiveProduct(null)}
            onAddToCart={(p, qty) => {
              handleAddToCart(p, qty);
              setActiveProduct(null);
            }}
            onAddReview={handleAddReview}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={() => {
              setCartOpen(false);
              setCheckoutActive(true);
              setAdminActive(false);
              setAboutActive(false);
              setFaqsActive(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </AnimatePresence>

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {wishlistOpen && (
          <WishlistDrawer
            wishlist={wishlist}
            onClose={() => setWishlistOpen(false)}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
