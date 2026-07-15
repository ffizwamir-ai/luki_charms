import { Product } from '../types';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'luki-charm-01',
    name: 'Royal Lavender Dreams Charm',
    description: 'An exquisite hand-crafted charm bracelet featuring genuine lavender quartz crystals, premium silver charms, and a glowing amethyst center piece. Perfectly curated to evoke elegant fairy-tale dreams.',
    price: 4850,
    originalPrice: 6200,
    rating: 4.9,
    reviews: [
      { id: 'r1', author: 'Ayesha Khan', rating: 5, comment: 'Absolutely gorgeous! The lavender crystals glow so beautifully in the light.', date: '2026-06-25' },
      { id: 'r2', author: 'Sana Ahmed', rating: 4.8, comment: 'Very high quality, packaging was extremely premium. Highly recommended!', date: '2026-07-02' }
    ],
    category: 'Charm',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
    featured: true,
    bestSeller: true,
    newArrival: false,
    materials: ['S925 Sterling Silver', 'Genuine Lavender Quartz', 'Amethyst Accent'],
    colors: ['Lavender Purple', 'Prismatic Silver', 'Rose Accent'],
    tags: ['Best Seller', 'Charm Bracelet', 'Lavender']
  },
  {
    id: 'luki-handmade-02',
    name: 'Majestic Velvet Meadow',
    description: 'Carefully woven with luxurious silk threads, elegant gold-plated beads, and soft pink rose quartz stones. Each meadow-themed bead is handcrafted individually by local artisans with absolute precision.',
    price: 3450,
    originalPrice: 4500,
    rating: 4.8,
    reviews: [
      { id: 'r3', author: 'Mariam Ali', rating: 5, comment: 'The beadwork is so intricate. You can tell it took a lot of effort to make this!', date: '2026-07-10' }
    ],
    category: 'Handmade',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 8,
    featured: true,
    bestSeller: false,
    newArrival: true,
    materials: ['Silk Thread Cord', '18K Gold Plated Beads', 'Natural Rose Quartz'],
    colors: ['Soft Pink', 'Rich Gold', 'Emerald Beads'],
    tags: ['Handmade', 'Woven Cord', 'Gold Beads']
  },
  {
    id: 'luki-luxury-03',
    name: 'Imperial Glow Diamond Infinity',
    description: 'An elite masterpiece featuring premium cubic zirconia crystals set on a highly polished platinum-plated infinity band. Designed for women who appreciate timeless luxury and standard royal aesthetics.',
    price: 8950,
    originalPrice: 12000,
    rating: 5.0,
    reviews: [
      { id: 'r4', author: 'Zainab Fatima', rating: 5, comment: 'This is premium luxury! The stones sparkle like real diamonds. Best buy.', date: '2026-07-05' },
      { id: 'r5', author: 'Hina Tariq', rating: 5, comment: 'Stunning luxury. Delivery was very fast and the box is extremely premium with built-in led light!', date: '2026-07-12' }
    ],
    category: 'Luxury',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 12,
    featured: true,
    bestSeller: true,
    newArrival: false,
    materials: ['Platinum-Plated S925', 'Premium AAAAA Cubic Zirconia'],
    colors: ['Ice Silver', 'Diamond Sparkle'],
    tags: ['Luxury Selection', 'Elite Sparkle', 'Infinity Band']
  },
  {
    id: 'luki-pearl-04',
    name: 'Elysian Pink Pearl Harmony',
    description: 'Glistening freshwater cultured pearls hand-selected for their impeccable luster and deep pink-lavender undertones. Linked with an elegant, adjustable 18K rose-gold vermeil clasp.',
    price: 5950,
    originalPrice: 7500,
    rating: 4.7,
    reviews: [
      { id: 'r6', author: 'Fatima Bilal', rating: 4, comment: 'Very delicate and classy. Fits perfectly on my small wrist.', date: '2026-06-18' }
    ],
    category: 'Pearl',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    featured: false,
    bestSeller: true,
    newArrival: false,
    materials: ['Freshwater Cultured Pearls', '18K Rose Gold Vermeil Clasp'],
    colors: ['Blush Pink Pearl', 'Rose Gold'],
    tags: ['Pearl Elegance', 'Freshwater', 'Classic Class']
  },
  {
    id: 'luki-crystal-05',
    name: 'Cosmic Amethyst & Aura Crystal',
    description: 'Harness the mystical energies of the universe with our Cosmic Aura bracelet. Hand-strung deep violet amethyst gemstones are bordered by iridescent aurora-borealis crystals that flash purple, lavender, and pink.',
    price: 4250,
    originalPrice: 5800,
    rating: 4.9,
    reviews: [
      { id: 'r7', author: 'Anum Jamil', rating: 5, comment: 'The colors are so vibrant. It feels mystical to wear it.', date: '2026-07-01' }
    ],
    category: 'Crystal',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 14,
    featured: false,
    bestSeller: false,
    newArrival: true,
    materials: ['Genuine Deep Amethyst', 'Aurora Borealis Crystals'],
    colors: ['Deep Violet', 'Iridescent Crystal', 'Glow Pink'],
    tags: ['Crystal Magic', 'Aura Violet', 'Aesthetic']
  },
  {
    id: 'luki-fashion-06',
    name: 'Trendy Lavender Glass-Charm',
    description: 'An ultra-modern, chic glassmorphism-styled chain bracelet. Merging metallic links with thick, high-clarity translucent colored glass beads in stunning lavender and elegant pastel pink shades.',
    price: 2950,
    originalPrice: 3800,
    rating: 4.6,
    reviews: [
      { id: 'r8', author: 'Zara Shah', rating: 4.5, comment: 'Perfect for daily wear. Fits very well with western outfits.', date: '2026-07-08' }
    ],
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
    featured: false,
    bestSeller: false,
    newArrival: true,
    materials: ['Premium Stainless Steel Link', 'Tempered Resin Glass Beads'],
    colors: ['Lavender Blue', 'Blush Pink', 'Chrome Silver'],
    tags: ['Fashion Chain', 'Street Chic', 'Daily Luxury']
  },
  {
    id: 'luki-custom-07',
    name: 'Luki Personalized Letter Emblem',
    description: 'Make it uniquely yours or create a priceless gift. A sleek premium 18K gold-plated bar is hand-engraved with your desired letters or name, supported by a dainty double-row silk cord in elegant royal purple or soft pink.',
    price: 5250,
    originalPrice: 6900,
    rating: 4.9,
    reviews: [
      { id: 'r9', author: 'Amna Sohail', rating: 5, comment: 'I ordered with my initials. The engraving is beautiful and precise!', date: '2026-07-11' }
    ],
    category: 'Customized',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 10,
    featured: true,
    bestSeller: false,
    newArrival: false,
    materials: ['18K Gold Plated Bar', 'Double Silk Cord', 'Diamond-cut lettering'],
    colors: ['Imperial Gold', 'Royal Purple Cord', 'Soft Pink Cord'],
    tags: ['Customized', 'Engraved', 'Perfect Gift']
  }
];
