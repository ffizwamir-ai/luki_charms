import { Product } from '../types';
import { X, Heart, Trash2, ShoppingCart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface WishlistDrawerProps {
  wishlist: Product[];
  onClose: () => void;
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  wishlist,
  onClose,
  onRemoveFromWishlist,
  onAddToCart
}: WishlistDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs" id="wishlist-drawer-backdrop">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35 }}
        className="relative w-full max-w-md bg-slate-900 border-l border-purple-950/60 h-full flex flex-col z-10 shadow-2xl"
        id="wishlist-drawer-container"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-950/40 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-current" />
            <h2 className="font-serif text-lg font-bold text-white">Your Wishlist</h2>
            <span className="text-xs bg-purple-950 text-pink-300 font-bold px-2 py-0.5 rounded-full border border-purple-900/30 font-mono">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900 hover:bg-purple-950 text-purple-300 hover:text-white transition cursor-pointer"
            id="btn-close-wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-purple-950/60 flex items-center justify-center text-purple-400 border border-purple-900/20">
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-sm text-purple-200 font-semibold font-serif">Wishlist is empty</p>
              <p className="text-xs text-purple-400 max-w-xs leading-relaxed">
                Save your favorite luxury items to review them here.
              </p>
            </div>
          ) : (
            wishlist.map((product) => {
              const outOfStock = product.stock <= 0;
              return (
                <div
                  key={product.id}
                  className="flex gap-3 bg-slate-950/40 border border-purple-950/40 p-3 rounded-xl relative group"
                  id={`wishlist-item-${product.id}`}
                >
                  {/* Thumb */}
                  <div className="w-18 aspect-square rounded-lg overflow-hidden bg-slate-950 border border-purple-950/30 flex-shrink-0">
                    <img src={product.images[0]} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-left min-w-0 space-y-1">
                    <h4 className="text-xs font-serif font-bold text-white truncate pr-6">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-purple-400 font-mono uppercase tracking-wider">{product.category}</span>
                      {outOfStock && (
                        <span className="text-[9px] text-red-400 border border-red-500/30 px-1.5 rounded uppercase font-mono">Sold Out</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-pink-300">
                        Rs. {product.price.toLocaleString()}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Quick Delete */}
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="p-1.5 rounded-full bg-slate-900 hover:bg-red-950 hover:text-red-400 text-purple-400 border border-purple-900/30 transition cursor-pointer"
                          id={`btn-wishlist-del-${product.id}`}
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Move to bag */}
                        {!outOfStock && (
                          <button
                            onClick={() => {
                              onAddToCart(product);
                              onRemoveFromWishlist(product);
                            }}
                            className="p-1.5 rounded-full bg-pink-700 hover:bg-pink-600 text-white border border-pink-500/30 transition cursor-pointer"
                            id={`btn-wishlist-bag-${product.id}`}
                            title="Add to Bag"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info decorator */}
        <div className="p-4 border-t border-purple-950/40 bg-slate-950/40 text-center text-xs text-purple-400 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Crafted with premium materials for you.
        </div>
      </motion.div>
    </div>
  );
}
