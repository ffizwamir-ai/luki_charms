import { Product } from '../types';
import { Heart, ShoppingCart, Eye, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: ProductCardProps) {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const outOfStock = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-pink-500/40 shadow-xl hover:shadow-pink-500/5 transition-all duration-300 flex flex-col h-full"
      id={`product-card-${product.id}`}
    >
      {/* Decorative inner borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image Spotlight Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition duration-700"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-pink-600/90 backdrop-blur-sm border border-pink-400/40 text-white text-[10px] font-bold tracking-wider uppercase">
              Save {discountPercent}%
            </span>
          )}
          {product.bestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-purple-900/90 backdrop-blur-sm border border-purple-400/40 text-pink-300 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-pink-400" /> Best Seller
            </span>
          )}
          {product.newArrival && (
            <span className="px-2.5 py-1 rounded-full bg-blue-900/95 backdrop-blur-sm border border-blue-400/30 text-blue-200 text-[10px] font-bold tracking-wider uppercase">
              New Arrival
            </span>
          )}
          {outOfStock && (
            <span className="px-2.5 py-1 rounded-full bg-red-950/95 border border-red-500/50 text-red-300 text-[10px] font-bold tracking-wider uppercase">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full border backdrop-blur-sm z-10 transition-all duration-300 cursor-pointer ${
            isWishlisted
              ? 'bg-pink-600/90 border-pink-400 text-white'
              : 'bg-slate-950/60 border-purple-800/40 text-purple-300 hover:text-pink-400 hover:border-pink-500'
          }`}
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          id={`btn-wishlist-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick action card slide-up pane (Desktop hover) */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-3 rounded-full bg-purple-950/80 border border-purple-800/60 hover:bg-purple-900 text-pink-300 hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            id={`btn-quick-view-${product.id}`}
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          {!outOfStock && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-3 rounded-full bg-pink-700/80 border border-pink-500/60 hover:bg-pink-600 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 cursor-pointer"
              id={`btn-quick-cart-${product.id}`}
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Meta details section */}
      <div className="p-4 flex flex-col flex-grow text-left space-y-2 bg-gradient-to-b from-white/0 to-white/5">
        {/* Category & Ratings row */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-bold">
            {product.category} Bracelet
          </span>
          <div className="flex items-center gap-1 bg-white/10 border border-white/5 rounded-full px-2 py-0.5">
            <Star className="w-3 h-3 text-pink-400 fill-current" />
            <span className="text-[10px] font-bold text-purple-200 font-sans">{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onViewDetails(product)}
          className="font-serif text-base font-semibold text-white group-hover:text-pink-300 transition duration-300 line-clamp-1 cursor-pointer"
          id={`title-product-${product.id}`}
        >
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-purple-300/70 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="pt-2 flex-grow flex items-end justify-between">
          {/* Prices block */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-300 to-purple-100">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-purple-400/60 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quick Buy Mobile Button (Shows as text on mobile, is direct) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (outOfStock) {
                onViewDetails(product);
              } else {
                onAddToCart(product);
              }
            }}
            disabled={outOfStock}
            className={`md:hidden px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
              outOfStock
                ? 'bg-white/5 text-purple-400 border border-white/5'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
            }`}
            id={`btn-mobile-buy-${product.id}`}
          >
            {outOfStock ? 'Sold' : 'Buy'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
