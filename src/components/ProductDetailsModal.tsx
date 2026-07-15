import React, { useState } from 'react';
import { Product, Review } from '../types';
import { X, Star, ShoppingBag, Send, AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddReview: (productId: string, review: { author: string; rating: number; comment: string }) => void;
}

export default function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  onAddReview
}: ProductDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    onAddReview(product.id, {
      author: author.trim(),
      rating,
      comment: comment.trim()
    });

    setAuthor('');
    setRating(5);
    setComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const outOfStock = product.stock <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto" id="details-modal-wrapper">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-purple-950/60 rounded-2xl overflow-hidden shadow-2xl shadow-black my-8"
        id="details-modal-container"
      >
        {/* Inner glow header decorator */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-800 via-pink-600 to-purple-800" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/60 hover:bg-purple-950/80 text-purple-300 hover:text-white border border-purple-900/40 transition-all duration-300 cursor-pointer"
          id="btn-close-details-modal"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* Column 1: Multi-Image Showcase (5/12 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Active Image Spot */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 border border-purple-950/40 shadow-inner">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {outOfStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="px-4 py-2 border border-red-500 rounded-full text-red-400 font-bold tracking-wider uppercase bg-slate-950/85 text-xs">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Carousel Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    id={`btn-thumbnail-${idx}`}
                    className={`relative w-20 aspect-square rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                      activeImageIndex === idx ? 'border-pink-500 shadow-md shadow-pink-500/20' : 'border-purple-950/40 hover:border-purple-800/60'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Details & Review forms (7/12 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Category and Title */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold bg-purple-950/40 px-3 py-1 rounded-full border border-purple-900/40">
                {product.category} Bracelet Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight pt-1">
                {product.name}
              </h2>
            </div>

            {/* Ratings and Prices info */}
            <div className="flex flex-wrap items-center gap-4 py-3 border-y border-purple-950/40">
              <div className="flex items-center gap-1.5">
                <div className="flex text-pink-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4.5 h-4.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-white font-sans">{product.rating}</span>
                <span className="text-xs text-purple-400/80">({product.reviews.length} reviews)</span>
              </div>

              <div className="h-4 w-px bg-purple-950/60" />

              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-300 to-purple-100">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-purple-400/50 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400">The Story & Design</h4>
              <p className="text-sm text-purple-200/90 leading-relaxed font-sans">{product.description}</p>
            </div>

            {/* Product Metadata Details (materials, colors, stock) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/40 border border-purple-950/40 rounded-xl p-4">
              <div>
                <span className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider">Premium Materials:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {product.materials.map((mat, i) => (
                    <span key={i} className="text-xs bg-purple-950/60 text-purple-200 px-2 py-1 border border-purple-900/30 rounded">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider">Aesthetic Colors:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {product.colors.map((col, i) => (
                    <span key={i} className="text-xs bg-purple-950/60 text-purple-200 px-2 py-1 border border-purple-900/30 rounded">
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-purple-950/20 flex justify-between items-center text-xs">
                <div className="flex items-center gap-1 text-purple-300">
                  <ShieldCheck className="w-4 h-4 text-pink-400" />
                  <span>Delivery in 2-3 Days across Pakistan</span>
                </div>
                <span className={`font-mono text-[10px] uppercase font-semibold ${product.stock > 5 ? 'text-emerald-400' : product.stock > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                  {product.stock > 5 ? `In Stock (${product.stock} available)` : product.stock > 0 ? `Low Stock (${product.stock} left!)` : 'Out Of Stock'}
                </span>
              </div>
            </div>

            {/* Cart Quantity Adder (only if stock > 0) */}
            {!outOfStock && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <div className="flex items-center justify-between border border-purple-800/40 rounded-full px-4 py-2 bg-slate-950/40 min-w-[140px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-purple-300 hover:text-pink-400 text-lg font-bold w-6 h-6 flex items-center justify-center cursor-pointer"
                    id="btn-qty-decrement"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="text-purple-300 hover:text-pink-400 text-lg font-bold w-6 h-6 flex items-center justify-center cursor-pointer"
                    id="btn-qty-increment"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-1 bg-gradient-to-r from-purple-800 via-pink-700 to-purple-800 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 cursor-pointer transition-all duration-300"
                  id="btn-modal-add-to-cart"
                >
                  <ShoppingBag className="w-4.5 h-4.5" /> Add Rs. {(product.price * quantity).toLocaleString()} to Bag
                </button>
              </div>
            )}

            {/* --- REVIEWS AND WRITE-A-REVIEW SUBSECTION --- */}
            <div className="border-t border-purple-950/40 pt-6 space-y-6">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" /> Customer Reflections
              </h3>

              {/* Read existing reviews */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                {product.reviews.length === 0 ? (
                  <p className="text-xs text-purple-400/80 italic">No reviews yet. Be the first to reflect on this charm!</p>
                ) : (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="bg-slate-950/30 border border-purple-950/40 rounded-lg p-3 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-purple-200">{rev.author}</span>
                        <span className="text-[10px] text-purple-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex text-pink-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'opacity-25'}`} />
                        ))}
                      </div>
                      <p className="text-purple-300/90 italic font-sans leading-relaxed pt-1">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Submit Review Form */}
              <form onSubmit={handleSubmitReview} className="bg-slate-950/50 border border-purple-950/50 rounded-xl p-4 space-y-3" id="form-review-submit">
                <h4 className="text-xs font-mono uppercase tracking-wider text-pink-400 font-semibold">Leave Your Reflections</h4>
                
                {reviewSuccess && (
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs rounded-lg animate-pulse">
                    Thank you! Your reflections were posted successfully.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-purple-400 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sana Malik"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-slate-900 border border-purple-900/40 text-purple-200 placeholder-purple-400/40 text-xs rounded px-3 py-2 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-purple-400 uppercase mb-1">Rating</label>
                    <div className="flex items-center gap-1 h-8">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const starVal = idx + 1;
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setRating(starVal)}
                            className="p-1 text-pink-400 hover:scale-110 transition cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${starVal <= rating ? 'fill-current' : 'opacity-30'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-purple-400 uppercase mb-1">Your Reflection</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Describe your boutique experience with this bracelet..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-900 border border-purple-900/40 text-purple-200 placeholder-purple-400/40 text-xs rounded px-3 py-2 focus:outline-none focus:border-pink-500 resize-none"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-950/60 hover:bg-purple-900/40 text-pink-300 text-xs border border-purple-800/40 rounded-full flex items-center gap-1.5 ml-auto cursor-pointer transition"
                    id="btn-submit-review"
                  >
                    <Send className="w-3 h-3" /> Post Reflection
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
