import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, ArrowLeft, Send, Sparkles, MapPin, Phone, CreditCard, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutFormProps {
  cart: CartItem[];
  onClose: () => void;
  onOrderPlaced: (orderDetails: any) => void;
}

export default function CheckoutForm({ cart, onClose, onOrderPlaced }: CheckoutFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Islamabad');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BankTransfer'>('COD');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = 0; // Free shipping all over Pakistan!
  const total = subtotal + shippingFee;

  const pakCities = [
    'Islamabad', 'Lahore', 'Karachi', 'Rawalpindi', 'Peshawar', 
    'Faisalabad', 'Multan', 'Quetta', 'Sialkot', 'Gujranwala', 
    'Hyderabad', 'Sargodha', 'Bahawalpur', 'Abbottabad', 'Swat'
  ].sort();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0]
    }));

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          customerAddress: address,
          customerCity: city,
          items: orderItems,
          subtotal,
          shippingFee,
          total
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong while placing your order.');
      }

      setPlacedOrder(data);
      onOrderPlaced(data); // Clear cart and trigger parent updates
    } catch (err: any) {
      setErrorMsg(err.message || 'Connection failure. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTracking = () => {
    if (!placedOrder) return;
    navigator.clipboard.writeText(placedOrder.trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (placedOrder) {
    return (
      <div className="max-w-xl mx-auto p-6 sm:p-8 bg-slate-900 border border-purple-950/60 rounded-2xl shadow-2xl shadow-black my-8 text-center space-y-6 animate-fade-in">
        <div className="relative w-20 h-20 rounded-full bg-emerald-950/60 border-2 border-emerald-500/60 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <Check className="w-10 h-10 text-emerald-400" />
          <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-ping" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">SubhanAllah! Order Placed</h2>
          <p className="text-purple-300 text-sm max-w-sm mx-auto">
            Thank you for shopping with Luki Charms. Your premium handmade bracelet order has been successfully logged!
          </p>
        </div>

        {/* Order Details Receipt card */}
        <div className="bg-slate-950/60 border border-purple-950/50 rounded-xl p-5 text-left space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-purple-400 font-mono">ORDER ID:</span>
            <span className="text-white font-mono font-bold">{placedOrder.id}</span>
          </div>

          <div className="h-px bg-purple-950/30" />

          {/* Tracking Number */}
          <div>
            <span className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Your Tracking Code:</span>
            <div className="flex items-center justify-between bg-slate-900 border border-purple-900/40 rounded-lg px-3 py-2 text-sm font-mono text-white">
              <span className="font-bold text-pink-300">{placedOrder.trackingCode}</span>
              <button
                onClick={handleCopyTracking}
                className="p-1 hover:text-pink-400 text-purple-400 transition cursor-pointer"
                title="Copy tracking number"
                id="btn-copy-tracking"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <span className="block text-[9px] text-purple-400 mt-1 italic">
              Keep this code to track your shipment across Pakistan.
            </span>
          </div>

          <div className="h-px bg-purple-950/30" />

          {/* Customer Summary details */}
          <div className="space-y-1 text-xs">
            <p className="text-purple-300"><strong className="text-purple-200">Customer:</strong> {placedOrder.customerName}</p>
            <p className="text-purple-300"><strong className="text-purple-200">Contact Number:</strong> {placedOrder.customerPhone}</p>
            <p className="text-purple-300"><strong className="text-purple-200">Destination:</strong> {placedOrder.customerAddress}, {placedOrder.customerCity}</p>
            <p className="text-purple-300">
              <strong className="text-purple-200">Payment Status:</strong>{' '}
              <span className="text-amber-400 font-bold uppercase font-mono">{placedOrder.items[0]?.price ? 'Cash on Delivery (COD)' : 'Bank Transfer'}</span>
            </p>
          </div>

          <div className="h-px bg-purple-950/30" />

          {/* Order subtotal receipt */}
          <div className="flex justify-between items-center font-bold text-sm text-white">
            <span>Total Payable:</span>
            <span className="text-pink-300 font-mono">Rs. {placedOrder.total.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-800 to-pink-700 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-sm cursor-pointer transition"
          id="btn-close-placed-modal"
        >
          Continue Luxury Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 border border-purple-950/60 rounded-2xl shadow-2xl shadow-black my-8" id="checkout-form-wrapper">
      <div className="flex items-center justify-between pb-6 border-b border-purple-950/40 mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition cursor-pointer"
          id="btn-back-to-bag"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Bag
        </button>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-300">
          Secure Boutique Checkout
        </h2>
        <div className="w-10" /> {/* Spacer balance */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Billing Form column (7/12 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 text-left space-y-5" id="form-order-checkout">
          <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-pink-400" /> Delivery & Billing Address
          </h3>

          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-lg">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Zainab Fatima"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/40 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Grid for phone and email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4.5 h-4.5 text-purple-400/60" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03095590059"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/40 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. zainab@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/40 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* Pakistan City Selection */}
            <div>
              <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">City *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 cursor-pointer"
              >
                {pakCities.map((c) => (
                  <option key={c} value={c} className="bg-slate-950 text-purple-200">
                    {c} (Pakistan)
                  </option>
                ))}
              </select>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">Street Address *</label>
              <textarea
                required
                rows={3}
                placeholder="House Number, Street Name, Sector/Area..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/40 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 resize-none"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">Preferred Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'bg-purple-950/40 border-pink-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-purple-950/40 text-purple-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-bold">Cash on Delivery (COD)</span>
                    <span className="block text-xs text-purple-400 mt-0.5 leading-snug">Pay in cash upon doorstep delivery. Recommended and 100% secure.</span>
                  </div>
                </button>

                {/* Direct Bank Transfer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('BankTransfer')}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                    paymentMethod === 'BankTransfer'
                      ? 'bg-purple-950/40 border-pink-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-purple-950/40 text-purple-300'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block text-sm font-bold">Bank Transfer</span>
                    <span className="block text-xs text-purple-400 mt-0.5 leading-snug">Transfer to Luki Charms bank/Easypaisa/JazzCash account before shipping.</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-purple-800 via-pink-700 to-purple-800 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 cursor-pointer disabled:opacity-50 transition duration-300"
            id="btn-confirm-order-placement"
          >
            {loading ? 'Processing Order...' : <>Place Cash on Delivery Order <Send className="w-4 h-4" /></>}
          </button>
        </form>

        {/* Order Summary column (5/12 cols) */}
        <div className="lg:col-span-5 bg-slate-950/40 border border-purple-950/60 rounded-2xl p-5 space-y-4 text-left">
          <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-4.5 h-4.5 text-pink-400" /> Order Summary
          </h3>

          {/* Checkout items */}
          <div className="space-y-3.5 max-h-[240px] overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-3 items-center justify-between text-xs">
                <div className="flex gap-2.5 items-center min-w-0">
                  <div className="w-10 h-10 rounded overflow-hidden bg-slate-950 border border-purple-900/30 flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-purple-200 truncate">{item.product.name}</p>
                    <p className="text-[10px] text-purple-400 font-mono">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-mono text-purple-200 font-semibold">
                  Rs. {(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="h-px bg-purple-950/40" />

          {/* Pricing calculations */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-purple-300">
              <span>Items Subtotal</span>
              <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-purple-300">
              <span>Local Shipping</span>
              <span className="text-emerald-400 uppercase font-semibold font-mono">FREE DELIVERY</span>
            </div>

            <div className="h-px bg-purple-950/40 my-1" />

            <div className="flex justify-between text-white font-bold text-base font-serif">
              <span>Total Payable</span>
              <span className="text-pink-300 font-mono">Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Pakistan Shipping Note */}
          <div className="bg-slate-900 border border-purple-900/30 rounded-xl p-3.5 space-y-1.5 text-xs text-purple-300">
            <p className="font-serif font-bold text-white text-[13px] flex items-center gap-1.5">
              🇵🇰 Boutique Shipping Pledge
            </p>
            <p className="text-[11px] leading-relaxed">
              Every Luki Charms package is housed in a luxury gift box and bubble-wrapped for safe postage. Deliveries take 2-3 business days to Islamabad, Lahore, & Karachi, and up to 4 days for other locales in Pakistan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
