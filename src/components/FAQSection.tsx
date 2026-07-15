import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Truck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FAQ {
  q: string;
  a: string;
  category: 'delivery' | 'quality' | 'order';
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      q: "Where is Luki Charms located and how do you deliver?",
      a: "We are a premium handcrafted boutique based in Pakistan. We offer express delivery all over Pakistan, including Lahore, Karachi, Islamabad, Peshawar, Rawalpindi, Quetta, Faisalabad, Sialkot, and beyond! Every order is bubble-wrapped and shipped in a premium jewelry gift box.",
      category: "delivery"
    },
    {
      q: "Are the bracelets handmade?",
      a: "Yes! Our Handmade and Customized bracelet collections are 100% hand-crafted by skilled local artisans using genuine natural quartz crystals, freshwater cultured pearls, and high-quality durable stringing materials.",
      category: "quality"
    },
    {
      q: "How can I track my order?",
      a: "After placing an order, you will receive a custom Luki Charms tracking number (e.g. LC-PAK-XXXXX). You can use this tracking number to view your delivery status in real-time or reach out directly to our customer support helpline.",
      category: "order"
    },
    {
      q: "Can I customize a bracelet with my name or initials?",
      a: "Absolutely! Our 'Customized Bracelets' feature a solid premium gold-plated or silver bar that can be hand-engraved with your initials, name, or custom dates. Just select the Custom option and enter your details during checkout.",
      category: "quality"
    },
    {
      q: "What is your refund or exchange policy?",
      a: "We take immense pride in our luxury craftsmanship. If your bracelet arrives damaged or does not fit, we offer a hassle-free 7-day exchange policy. Contact our support team via WhatsApp at 03095590059 with your tracking code.",
      category: "order"
    },
    {
      q: "How do I care for my crystal and pearl jewelry?",
      a: "To maintain the spectacular luster of your freshwater pearls and natural crystals, avoid direct contact with heavy perfumes, alcohol-based sanitizers, and pool water. Gently wipe with a soft micro-fiber cloth after wear.",
      category: "quality"
    }
  ];

  return (
    <section className="py-12 bg-transparent text-left relative overflow-hidden" id="faq-section">
      {/* Decorative gradient spheres */}
      <div className="absolute top-1/2 left-2/3 w-80 h-80 bg-pink-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 text-[11px] font-mono uppercase tracking-wider font-semibold">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Curious Reflections
          </h2>
          <p className="text-purple-300/80 text-sm max-w-lg mx-auto">
            Everything you need to know about purchasing, shipping, and maintaining your luxury Luki Charms.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-pink-500/30 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-white focus:outline-none cursor-pointer"
                  id={`btn-faq-question-${idx}`}
                >
                  <span className="font-serif text-sm sm:text-base font-bold pr-4 flex items-center gap-2">
                    {faq.category === 'delivery' && <Truck className="w-4.5 h-4.5 text-pink-400 flex-shrink-0" />}
                    {faq.category === 'quality' && <Heart className="w-4.5 h-4.5 text-pink-400 flex-shrink-0" />}
                    {faq.category === 'order' && <Sparkles className="w-4.5 h-4.5 text-pink-400 flex-shrink-0" />}
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 pt-2 text-sm text-purple-200/90 leading-relaxed font-sans border-t border-white/5 bg-white/2"
                    id={`faq-answer-${idx}`}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
