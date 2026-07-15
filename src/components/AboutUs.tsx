import { Sparkles, Heart, Shield, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <section className="py-12 bg-transparent relative overflow-hidden text-left" id="about-us-section">
      {/* Decorative backdrop glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Visual Bento collage (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-[360px] aspect-square rounded-[32px] overflow-hidden shadow-2xl border border-white/10 p-2 bg-white/5 backdrop-blur-md">
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
              alt="Artisan crafting handmade crystal bracelet"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* Soft dark elegant overlay */}
            <div className="absolute inset-2 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400 font-semibold">Our Studio</span>
              <p className="font-serif font-bold text-sm mt-1">Impeccable Precision in Every Thread</p>
            </div>
          </div>

          {/* Sparkles decorator */}
          <div className="absolute -top-4 -left-4 w-10 h-10 text-pink-400 animate-pulse">
            <Sparkles className="w-full h-full" />
          </div>
        </div>

        {/* Right column: Content (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 text-[11px] font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Our Heritage
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Crafting Pristine Masterpieces for Pakistan
            </h2>
          </div>

          <p className="text-purple-200/80 text-sm leading-relaxed font-sans">
            Born from a profound passion for gemology and luxurious adornments, <strong>Luki Charms</strong> redefines how elegant bracelets are curated in Pakistan. Every single bead, crystal, and freshwater pearl is sourced from premium ethical origins and strung with absolute care by local handcraft artists.
          </p>

          <p className="text-purple-300/70 text-xs sm:text-sm leading-relaxed">
            We believe that a bracelet is more than just jewelry—it is a visual projection of your character, aura, and grace. Whether you wear our iridescent <em>Aura Crystals</em>, classical <em>Cultured Pearls</em>, or personalized <em>Engraved Letter Emblems</em>, you carry a standard of royalty.
          </p>

          {/* Trust badges bento row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 hover:border-pink-500/20 p-5 rounded-2xl space-y-2 transition-all duration-300 shadow-sm">
              <Heart className="w-5 h-5 text-pink-400" />
              <h4 className="font-bold text-sm text-white font-serif">Handmade Love</h4>
              <p className="text-[10px] text-purple-300/80 font-sans leading-snug">Individually curated thread by thread, bead by bead.</p>
            </div>

            <div className="bg-white/5 border border-white/10 hover:border-pink-500/20 p-5 rounded-2xl space-y-2 transition-all duration-300 shadow-sm">
              <Shield className="w-5 h-5 text-pink-400" />
              <h4 className="font-bold text-sm text-white font-serif">Premium Metals</h4>
              <p className="text-[10px] text-purple-300/80 font-sans leading-snug">Hypoallergenic nickel-free sterling silver & 18K gold-plated vermeil.</p>
            </div>

            <div className="bg-white/5 border border-white/10 hover:border-pink-500/20 p-5 rounded-2xl space-y-2 transition-all duration-300 shadow-sm">
              <Award className="w-5 h-5 text-pink-400" />
              <h4 className="font-bold text-sm text-white font-serif">Luxury Boxed</h4>
              <p className="text-[10px] text-purple-300/80 font-sans leading-snug">Encased in rich velvet boxes, perfect for regal gifting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
