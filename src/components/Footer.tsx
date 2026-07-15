import React, { useState } from 'react';
import { Phone, Mail, MapPin, Sparkles, Send, ShieldCheck, Heart, Github, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F0117]/95 text-purple-300 border-t border-white/10 text-left relative overflow-hidden backdrop-blur-md" id="footer-section">
      {/* Decorative gradient stripes */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      
      {/* Footer Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        {/* Brand details col (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white tracking-wider">Luki Charms</h3>
              <span className="block text-[8px] font-mono tracking-widest text-pink-400 uppercase leading-none">Luxury Bracelets</span>
            </div>
          </div>

          <p className="text-xs text-purple-400/90 leading-relaxed font-sans">
            Curators of Pakistan's most refined handcrafted charms, freshwater pearls, and majestic crystal bracelets. Dedicated to delivering timeless grace and absolute royal confidence to your doorstep.
          </p>

          <div className="space-y-2 pt-2 text-xs text-purple-300">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <a href="tel:03095590059" className="hover:text-pink-300 transition font-mono">03095590059</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <a href="mailto:lukizimeka@gmail.com" className="hover:text-pink-300 transition font-mono">lukizimeka@gmail.com</a>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <span>Premium Boutique Courier Network, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Categories Col (2 cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-serif text-sm font-bold text-white">Our Collections</h4>
          <ul className="space-y-2 text-xs text-purple-400/90">
            {['Charm', 'Handmade', 'Luxury', 'Pearl', 'Crystal', 'Fashion', 'Customized'].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onSelectCategory(cat)}
                  className="hover:text-pink-300 transition text-left cursor-pointer"
                  id={`btn-footer-link-${cat.toLowerCase()}`}
                >
                  {cat} Bracelets
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery pledge col (2 cols) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-serif text-sm font-bold text-white">Boutique Service</h4>
          <ul className="space-y-2 text-xs text-purple-400/90">
            <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Free Delivery
            </li>
            <li>Cash on Delivery</li>
            <li>Regal Velvet Box Packing</li>
            <li>Bespoke Custom Engravings</li>
            <li>7-Day Easy Exchange</li>
          </ul>
        </div>

        {/* Newsletter col (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-serif text-sm font-bold text-white">Bespoke Updates</h4>
          <p className="text-xs text-purple-400/90 leading-relaxed font-sans">
            Subscribe to receive private invitations to exclusive collections, seasonal edits, and VIP promotions in Pakistan.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2" id="form-footer-newsletter">
            {subscribed && (
              <div className="p-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] rounded">
                Your luxury email invitation has been logged.
              </div>
            )}
            <div className="flex bg-white/5 border border-white/10 rounded-full overflow-hidden p-1 focus-within:border-pink-500/85 transition">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 text-xs text-purple-200 placeholder-purple-400/40 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 text-white transition flex-shrink-0 cursor-pointer"
                id="btn-footer-subscribe"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Local SEO keywords layout container (Humbler, elegant, SEO compliant description) */}
      <div className="border-t border-white/5 bg-white/1 py-6 text-center text-[11px] text-purple-400/60 font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="max-w-2xl mx-auto font-sans leading-relaxed">
            Luki Charms is proudly celebrated as Pakistan’s premium luxury jewelry marketplace. Popularly cataloged under targeted search keywords including:{' '}
            <strong className="text-purple-300/80">Bracelets in Pakistan</strong>,{' '}
            <strong className="text-purple-300/80">Luxury Bracelets Pakistan</strong>,{' '}
            <strong className="text-purple-300/80">Handmade Bracelets Pakistan</strong>,{' '}
            <strong className="text-purple-300/80">Charm Bracelets Pakistan</strong>,{' '}
            <strong className="text-purple-300/80">Women's Accessories Pakistan</strong>, and{' '}
            <strong className="text-purple-300/80">Fashion Jewelry Pakistan</strong>. We ensure quick tracking, pristine packaging, and unmatched local delivery.
          </p>
        </div>
      </div>

      {/* Copyright row */}
      <div className="border-t border-white/5 bg-[#0F0117] py-4 text-center text-xs text-purple-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1">
          <span>&copy; {new Date().getFullYear()} Luki Charms. All Rights Reserved.</span>
          <span className="opacity-40">|</span>
          <span className="text-pink-500 font-semibold uppercase font-mono tracking-wider text-[9px] bg-white/5 border border-white/10 py-0.5 px-2 rounded-full">
            Delivery Available All Over Pakistan
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 hover:text-white text-[10px] uppercase font-mono transition cursor-pointer"
            id="btn-footer-back-to-top"
          >
            Top <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
