import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star, Heart, Award, ShieldCheck, Truck, Phone, Mail } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomizedClick: () => void;
}

export default function Hero({ onExploreClick, onCustomizedClick }: HeroProps) {
  return (
    <section className="relative py-8 sm:py-12" id="hero-section">
      {/* Main Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* BLOCK 1: Hero Main Text & Actions Segment (7 columns width) */}
        <div className="col-span-12 lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 flex flex-col justify-between overflow-hidden relative shadow-xl min-h-[420px]">
          {/* Ambient subtle decorative circle */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[30px] border-white/5 rounded-full pointer-events-none" />
          
          <div className="space-y-6 relative z-10 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-pink-300 text-[10px] sm:text-xs font-semibold tracking-wider uppercase shadow-inner"
              id="hero-badge"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              Pakistan's Premier Jewelry Boutique
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-tight text-white">
                Elegance Woven <br />
                in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-pink-300">
                  Luki Charms
                </span>
              </h1>
              <p className="text-purple-200/70 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
                Discover Pakistan’s most premium collection of handmade, charm, and luxury crystal bracelets. Crafted with pristine precision for those who appreciate fine art.
              </p>
            </motion.div>
          </div>

          {/* Action buttons at bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8 relative z-10 w-full"
          >
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.03] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all duration-300 cursor-pointer animate-pulse"
              id="btn-hero-explore"
            >
              Explore Signature Collection <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onCustomizedClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/5 text-purple-200 hover:text-white border border-white/10 hover:bg-white/10 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              id="btn-hero-custom"
            >
              <Sparkles className="w-4 h-4 text-pink-400" /> Custom Designs
            </button>
          </motion.div>
        </div>

        {/* BLOCK 2: Spotlight Image Segment (5 columns width) */}
        <div className="col-span-12 lg:col-span-5 bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur-lg border border-pink-500/20 rounded-[32px] sm:rounded-[40px] p-3 flex flex-col justify-between overflow-hidden relative shadow-xl min-h-[420px]">
          {/* Top tag */}
          <div className="absolute top-4 left-6 bg-pink-500 text-white text-[9px] px-3 py-1 rounded-full uppercase font-black z-20 tracking-wider">
            Signature Design
          </div>

          {/* Image Container */}
          <div className="relative w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-purple-950/40 aspect-[4/5] sm:aspect-auto flex-1">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
              alt="Luki Charms Premium Bracelet"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform hover:scale-108 transition duration-[1200ms]"
            />
            
            {/* Premium glass tag overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-left">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-serif font-bold text-white">The Imperial Infinite</span>
                <div className="flex items-center gap-0.5 text-pink-400">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-purple-300 font-mono uppercase tracking-widest">Premium Crystal</span>
                <span className="text-sm font-bold text-pink-400">Rs. 8,950</span>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-1 -left-1 bg-purple-900/90 text-purple-200 text-[10px] font-mono border border-purple-700/50 rounded-full py-1 px-3 flex items-center gap-1.5 shadow-md z-20">
            <Heart className="w-3 h-3 text-pink-400 fill-current animate-pulse" /> Loved by 5k+ Customers
          </div>
        </div>

        {/* BLOCK 3: Customer Trust Score & Social proof (3 columns wide) */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-[#1A0B2E] border border-white/5 rounded-[32px] sm:rounded-[40px] p-6 flex flex-col justify-center items-center text-center relative hover:border-pink-500/20 transition-all shadow-md">
          {/* Floating subtle star icon background */}
          <div className="absolute top-4 right-4 text-pink-400/20">
            <Star className="w-6 h-6 fill-current" />
          </div>

          <div className="flex -space-x-2 mb-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#1A0B2E] bg-gray-600 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Reviewer" className="w-full h-full object-cover" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-[#1A0B2E] bg-gray-700 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Reviewer" className="w-full h-full object-cover" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-[#1A0B2E] bg-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
              +8k
            </div>
          </div>
          
          <p className="text-[10px] uppercase tracking-widest text-pink-400 font-bold mb-1 font-mono">Trust Score</p>
          <p className="text-3xl font-serif font-bold text-white mb-1">4.9/5</p>
          <p className="text-[11px] text-purple-300/70">Verified Customer Purchases</p>
        </div>

        {/* BLOCK 4: Brand Craftsmanship Detail (4 columns wide) */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4 bg-white/5 border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 shadow-md">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-pink-400 self-start mb-4">
            <Award className="w-5 h-5 text-pink-400" />
          </div>
          <div className="text-left space-y-1">
            <h4 className="text-xl font-serif font-semibold text-white">100% Handcrafted</h4>
            <p className="text-xs text-purple-300/60">Individually curated thread by thread, bead by bead in Pakistan.</p>
          </div>
        </div>

        {/* BLOCK 5: Customized Bead-by-Bead Section (5 columns wide) */}
        <div className="col-span-12 md:col-span-4 lg:col-span-5 bg-white/5 border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 flex items-center justify-between group hover:bg-white/10 transition-all duration-300 shadow-md">
          <div className="space-y-1.5 text-left">
            <h4 className="text-2xl font-serif font-bold text-white">Pearl & Crystals</h4>
            <p className="text-xs text-pink-300/60 uppercase tracking-widest font-mono font-bold">Bespoke Artisan Designs</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* BLOCK 6: Nation-wide Premium Logistics and Support Hotline (12 columns wide) */}
        <div className="col-span-12 bg-gradient-to-r from-[#4A1D64] to-[#2D0A4E] border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden text-left shadow-lg">
          
          <div className="z-10 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400 font-bold flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-pink-400 animate-bounce" /> Nation-wide Elite Postage
            </span>
            <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              Delivery Available All Over Pakistan
            </h4>
            
            <div className="flex flex-wrap gap-4 text-xs text-purple-200/80 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span> Karachi
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span> Lahore
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span> Islamabad
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span> Faisalabad
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span> Sialkot
              </span>
            </div>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-950/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
            <div className="space-y-1.5 pr-2">
              <span className="text-[10px] uppercase tracking-widest font-mono text-purple-300 font-bold block">Elite Concierge</span>
              <p className="text-lg font-mono font-bold text-pink-300 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-pink-400" /> 0309 5590059
              </p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-mono text-purple-300 font-bold block">Email Support</span>
              <p className="text-xs text-purple-200 hover:text-pink-300 transition-colors font-mono">
                lukizimeka@gmail.com
              </p>
            </div>
          </div>

          {/* Subtle Abstract Map Decoration */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none z-0">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
              <path fill="#FFF" d="M39.9,-65.4C50.2,-58.5,56.1,-44.5,63.1,-30.9C70.1,-17.3,78.2,-4.2,77.7,8.6C77.1,21.5,67.8,34.2,57.7,45.2C47.6,56.2,36.7,65.6,23.8,70.5C10.9,75.3,-3.9,75.6,-18.2,71.2C-32.4,66.8,-46,57.7,-57.4,46.1C-68.7,34.4,-77.8,20.2,-78.9,5.5C-79.9,-9.2,-72.9,-24.3,-62.7,-36.8C-52.6,-49.2,-39.3,-59,-25.9,-64.1C-12.6,-69.1,0.8,-69.4,14.6,-68.2C28.4,-67,39.9,-65.4,39.9,-65.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
