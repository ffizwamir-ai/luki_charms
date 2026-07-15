import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, ShieldAlert, Sparkles, Phone, Mail, Menu, X, Globe } from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onOpenAbout: () => void;
  onOpenFAQs: () => void;
  onSearch: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  onOpenAbout,
  onOpenFAQs,
  onSearch,
  selectedCategory,
  onSelectCategory
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const categories = [
    { name: 'All', value: 'All' },
    { name: 'Charm', value: 'Charm' },
    { name: 'Handmade', value: 'Handmade' },
    { name: 'Luxury', value: 'Luxury' },
    { name: 'Pearl', value: 'Pearl' },
    { name: 'Crystal', value: 'Crystal' },
    { name: 'Fashion', value: 'Fashion' },
    { name: 'Customized', value: 'Customized' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0F0117]/80 backdrop-blur-md border-b border-white/10 relative">
      {/* Top Notification Bar */}
      <div className="w-full bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-pink-500/20 border-b border-white/10 text-white text-xs py-1.5 px-4 flex flex-wrap justify-between items-center font-sans tracking-wide">
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 animate-pulse text-pink-400" />
          <span className="font-semibold text-purple-100">Free Delivery All Over Pakistan</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] opacity-90">
          <a href="tel:03095590059" className="hover:text-pink-400 transition flex items-center gap-1">
            <Phone className="w-3 h-3 text-pink-400" /> 03095590059
          </a>
          <span className="hidden sm:inline opacity-35">|</span>
          <a href="mailto:lukizimeka@gmail.com" className="hover:text-pink-400 transition hidden sm:flex items-center gap-1">
            <Mail className="w-3 h-3 text-pink-400" /> lukizimeka@gmail.com
          </a>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-purple-200 hover:text-pink-400 transition"
          aria-label="Toggle menu"
          id="btn-mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Identity */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectCategory('All')}>
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <span className="text-xl font-serif font-bold text-white">L</span>
            <div className="absolute inset-0 rounded-full border border-white/15 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-semibold tracking-tighter text-white">
              Luki<span className="text-pink-400">Charms</span>
            </h1>
            <span className="block text-[9px] font-mono tracking-widest text-pink-400 uppercase leading-none">
              Luxury Redefined
            </span>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex relative flex-1 max-w-md mx-4" id="form-search-desktop">
          <input
            type="text"
            placeholder="Search boutique charms..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full bg-white/5 text-purple-100 placeholder-purple-300/40 text-sm px-4 py-2 rounded-full border border-white/10 focus:outline-none focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/40 transition duration-300"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-purple-400 hover:text-pink-400 transition" id="btn-search-submit">
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-purple-200/90">
          <button onClick={onOpenAbout} className="hover:text-pink-400 transition cursor-pointer" id="btn-nav-about">About Us</button>
          <button onClick={onOpenFAQs} className="hover:text-pink-400 transition cursor-pointer" id="btn-nav-faqs">FAQs</button>
          <button onClick={onOpenAdmin} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-pink-300 text-xs transition cursor-pointer" id="btn-nav-admin">
            <ShieldAlert className="w-3.5 h-3.5 text-pink-400" /> Admin
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-purple-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition cursor-pointer border border-transparent hover:border-white/5"
            id="btn-wishlist-toggle"
            aria-label="Wishlist"
          >
            <Heart className="w-5.5 h-5.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-purple-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition cursor-pointer border border-transparent hover:border-white/5"
            id="btn-cart-toggle"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-pink-500/30">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Admin Icon */}
          <button
            onClick={onOpenAdmin}
            className="lg:hidden p-2 text-purple-300 hover:text-pink-400 hover:bg-white/5 rounded-full transition cursor-pointer"
            id="btn-admin-mobile-direct"
            aria-label="Admin Login"
          >
            <ShieldAlert className="w-5.5 h-5.5" />
          </button>
        </div>
      </div>

      {/* Category Navigation Bar - Desktop / Scrollable */}
      <div className="border-t border-white/5 bg-[#0F0117]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto py-3 gap-1 sm:gap-2 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onSelectCategory(cat.value)}
                  id={`btn-category-${cat.value.toLowerCase()}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 border border-white/10 scale-105 font-bold'
                      : 'text-purple-300 hover:text-white bg-white/5 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {cat.name} {cat.value !== 'All' ? 'Bracelets' : ''}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-[#1A0B2E]/95 backdrop-blur-xl border-t border-white/10 p-4 space-y-4 animate-fade-in-down" id="drawer-mobile-nav">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative flex w-full" id="form-search-mobile">
            <input
              type="text"
              placeholder="Search bracelets..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
              className="w-full bg-white/5 text-purple-100 placeholder-purple-300/40 text-sm px-4 py-2.5 rounded-full border border-white/10 focus:outline-none focus:border-pink-500"
            />
            <button type="submit" className="absolute right-3 top-3 text-purple-400" id="btn-search-submit-mobile">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-col gap-3 font-medium text-sm text-purple-200">
            <button 
              onClick={() => {
                onOpenAbout();
                setIsMobileMenuOpen(false);
              }} 
              className="text-left py-2 hover:text-pink-400 transition"
              id="btn-mobile-about"
            >
              About Us
            </button>
            <button 
              onClick={() => {
                onOpenFAQs();
                setIsMobileMenuOpen(false);
              }} 
              className="text-left py-2 hover:text-pink-400 transition"
              id="btn-mobile-faqs"
            >
              FAQs
            </button>
            <button 
              onClick={() => {
                onOpenAdmin();
                setIsMobileMenuOpen(false);
              }} 
              className="flex items-center gap-2 py-2 text-pink-300 hover:text-pink-400 transition"
              id="btn-mobile-admin"
            >
              <ShieldAlert className="w-4 h-4" /> Admin Controls
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
