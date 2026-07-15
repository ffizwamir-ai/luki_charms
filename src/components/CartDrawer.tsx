import { Product } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout
}: CartDrawerProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Standard free delivery all over Pakistan or a small order premium
  const shippingFee = subtotal > 0 ? 0 : 0; 
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs" id="cart-drawer-backdrop">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35 }}
        className="relative w-full max-w-md bg-slate-900 border-l border-purple-950/60 h-full flex flex-col z-10 shadow-2xl"
        id="cart-drawer-container"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-950/40 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pink-400" />
            <h2 className="font-serif text-lg font-bold text-white">Your Shopping Bag</h2>
            <span className="text-xs bg-purple-950 text-pink-300 font-bold px-2 py-0.5 rounded-full border border-purple-900/30 font-mono">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900 hover:bg-purple-950 text-purple-300 hover:text-white transition cursor-pointer"
            id="btn-close-cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-purple-950/60 flex items-center justify-center text-purple-400 border border-purple-900/20">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm text-purple-200 font-semibold font-serif">Your bag is empty</p>
              <p className="text-xs text-purple-400 max-w-xs leading-relaxed">
                Explore our exquisite handmade, customized, or luxury charm bracelets to fill your world with elegance.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-800 to-pink-700 text-white font-medium text-xs shadow-md cursor-pointer hover:opacity-90 transition"
                id="btn-cart-shop-now"
              >
                Shop Luxury Bracelets
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-slate-950/40 border border-purple-950/40 p-3 rounded-xl relative group"
                id={`cart-item-${item.product.id}`}
              >
                {/* Thumb */}
                <div className="w-18 aspect-square rounded-lg overflow-hidden bg-slate-950 border border-purple-950/30 flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 text-left min-w-0 space-y-1">
                  <h4 className="text-xs font-serif font-bold text-white truncate pr-6">
                    {item.product.name}
                  </h4>
                  <span className="block text-[10px] text-purple-400 font-mono uppercase tracking-wider">{item.product.category}</span>
                  
                  <div className="flex items-center justify-between pt-1">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border border-purple-900/30 rounded-full px-2.5 py-1 bg-slate-950/60 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="text-purple-300 hover:text-pink-400 font-bold px-1 cursor-pointer"
                        id={`btn-cart-dec-${item.product.id}`}
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-white text-[11px] min-w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                        className="text-purple-300 hover:text-pink-400 font-bold px-1 cursor-pointer"
                        id={`btn-cart-inc-${item.product.id}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Price total */}
                    <span className="text-xs font-bold text-pink-300">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveFromCart(item.product.id)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-900/80 hover:bg-red-950 hover:text-red-400 text-purple-400 border border-purple-900/30 transition cursor-pointer"
                  id={`btn-cart-remove-${item.product.id}`}
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-purple-950/40 bg-slate-950/60 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-purple-300">
                <span>Subtotal</span>
                <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-purple-300 text-xs">
                <span>Shipping Fee</span>
                <span className="text-emerald-400 uppercase font-mono">Free Delivery</span>
              </div>
              <div className="h-px bg-purple-950/40 my-2" />
              <div className="flex justify-between text-white font-bold text-base font-serif">
                <span>Total Amount</span>
                <span className="text-pink-300 font-mono">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-800 via-pink-700 to-purple-800 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 cursor-pointer transition duration-300"
              id="btn-cart-checkout"
            >
              Secure Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-purple-400">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-400" /> Standard Delivery Available All Over Pakistan
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
