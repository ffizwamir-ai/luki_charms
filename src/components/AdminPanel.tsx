import React, { useState, useEffect } from 'react';
import { Product, Order, DashboardStats } from '../types';
import { ShieldCheck, LogOut, Package, ShoppingBag, TrendingUp, AlertTriangle, RefreshCw, Plus, Edit2, Trash2, CheckCircle, Truck, X, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  onClose: () => void;
  allProducts: Product[];
  onRefreshProducts: () => void;
}

export default function AdminPanel({ onClose, allProducts, onRefreshProducts }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'inventory'>('dashboard');

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);

  // Product CRUD states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');

  // Form states (Add/Edit Product)
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('');
  const [prodCategory, setProdCategory] = useState<'Charm' | 'Handmade' | 'Luxury' | 'Pearl' | 'Crystal' | 'Fashion' | 'Customized'>('Charm');
  const [prodStock, setProdStock] = useState('10');
  const [prodImages, setProdImages] = useState('');
  const [prodMaterials, setProdMaterials] = useState('');
  const [prodColors, setProdColors] = useState('');
  const [prodTags, setProdTags] = useState('');

  // Preset image picker helper
  const presetImages = [
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80'
  ];

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('luki-admin-token');
    if (token === 'luki-charms-admin-token-2026') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAdminData();
    }
  }, [isLoggedIn]);

  const fetchAdminData = async () => {
    setLoadingStats(true);
    try {
      // Fetch Dashboard Stats
      const statsRes = await fetch('/api/dashboard-stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch Orders
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();
      setOrders(ordersData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('luki-admin-token', data.token);
        setIsLoggedIn(true);
      } else {
        setLoginError(data.error || 'Unauthorized Access');
      }
    } catch (err) {
      setLoginError('Failed to verify admin password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('luki-admin-token');
    setIsLoggedIn(false);
  };

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setProdName('');
    setProdDesc('');
    setProdPrice('');
    setProdOriginalPrice('');
    setProdCategory('Charm');
    setProdStock('10');
    setProdImages(presetImages[0]); // default
    setProdMaterials('Sterling Silver, Natural Gems');
    setProdColors('Silver, Purple');
    setProdTags('New, Featured');
    setShowAddForm(true);
  };

  const handleOpenEditForm = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdDesc(product.description);
    setProdPrice(product.price.toString());
    setProdOriginalPrice(product.originalPrice?.toString() || '');
    setProdCategory(product.category);
    setProdStock(product.stock.toString());
    setProdImages(product.images.join(', '));
    setProdMaterials(product.materials.join(', '));
    setProdColors(product.colors.join(', '));
    setProdTags(product.tags.join(', '));
    setShowAddForm(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');

    if (!prodName.trim() || !prodPrice.trim() || !prodImages.trim()) {
      setCrudError('Please enter product name, price and images.');
      return;
    }

    const imgArray = prodImages.split(',').map(s => s.trim()).filter(Boolean);
    const matArray = prodMaterials.split(',').map(s => s.trim()).filter(Boolean);
    const colArray = prodColors.split(',').map(s => s.trim()).filter(Boolean);
    const tagArray = prodTags.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      name: prodName.trim(),
      description: prodDesc.trim() || 'A luxury bracelet by Luki Charms.',
      price: Number(prodPrice),
      originalPrice: prodOriginalPrice ? Number(prodOriginalPrice) : null,
      category: prodCategory,
      images: imgArray,
      stock: Number(prodStock) || 0,
      materials: matArray,
      colors: colArray,
      tags: tagArray,
      featured: tagArray.includes('Featured') || tagArray.includes('featured'),
      bestSeller: tagArray.includes('Best Seller') || tagArray.includes('bestseller'),
      newArrival: tagArray.includes('New') || tagArray.includes('new')
    };

    try {
      let response;
      if (editingProduct) {
        // Edit Mode
        response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Create Mode
        response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        setCrudSuccess(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
        setTimeout(() => {
          setShowAddForm(false);
          setEditingProduct(null);
          onRefreshProducts();
          fetchAdminData();
        }, 1500);
      } else {
        const errorData = await response.json();
        setCrudError(errorData.error || 'Failed to save product details.');
      }
    } catch (err) {
      setCrudError('Network failure saving product.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this exquisite bracelet from the collection?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudSuccess('Product deleted successfully');
        onRefreshProducts();
        fetchAdminData();
        setTimeout(() => setCrudSuccess(''), 2000);
      } else {
        setCrudError('Failed to delete product.');
      }
    } catch (err) {
      setCrudError('Network issue deleting product.');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        setCrudSuccess(`Order status updated to ${status}`);
        fetchAdminData();
        setTimeout(() => setCrudSuccess(''), 2500);
      } else {
        setCrudError('Failed to update order status');
      }
    } catch (err) {
      setCrudError('Network issues updating order.');
    }
  };

  const handleQuickRestock = async (product: Product, amount: number) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: product.stock + amount })
      });

      if (res.ok) {
        onRefreshProducts();
        fetchAdminData();
      }
    } catch (err) {
      console.error('Failed to restock:', err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4" id="admin-login-wrapper">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900 border border-purple-950/60 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 text-left"
        >
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 bg-purple-950/60 border border-purple-900/40 rounded-full flex items-center justify-center mx-auto text-pink-400">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">Luki Admin Core</h2>
            <p className="text-purple-400 text-xs">Enter password to access inventory & sales graphs</p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-lg text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" id="form-admin-login">
            <div>
              <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">Boutique Passkey</label>
              <input
                type="password"
                required
                placeholder="e.g. admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 font-mono"
              />
              <span className="block text-[10px] text-purple-500 mt-2 italic text-center">
                Hint: Passkey is <code className="text-pink-400 font-semibold bg-slate-950 px-1 rounded">admin123</code> or <code className="text-pink-400 font-semibold bg-slate-950 px-1 rounded">lukiadmin2026</code>
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg border border-purple-900/40 text-purple-300 hover:text-white text-xs font-semibold hover:bg-purple-950/20 cursor-pointer transition"
                id="btn-admin-cancel-login"
              >
                Exit
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-800 to-pink-700 hover:opacity-90 text-white text-xs font-bold cursor-pointer transition"
                id="btn-admin-submit-login"
              >
                Authenticate
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col md:flex-row text-left overflow-hidden" id="admin-panel-wrapper">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-purple-950/60 flex flex-col flex-shrink-0">
        <div className="p-4 sm:p-5 border-b border-purple-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-600/20 border border-pink-500 flex items-center justify-center text-pink-400 font-bold font-serif text-sm">
              L
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-sm">Luki Charms</h3>
              <span className="block text-[9px] text-pink-400 font-mono uppercase tracking-wider">Admin Dashboard</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-full bg-slate-950 text-purple-300 hover:text-white border border-purple-900/30 cursor-pointer"
            id="btn-admin-sidebar-close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sidebar Nav links */}
        <nav className="p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 md:gap-1.5 flex-1 select-none no-scrollbar">
          {[
            { id: 'dashboard', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders Log', icon: ShoppingBag },
            { id: 'inventory', label: 'Inventory', icon: AlertTriangle }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setShowAddForm(false);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-800 to-pink-700 text-white shadow-md shadow-purple-500/10'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/20'
                }`}
                id={`btn-admin-tab-${item.id}`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout bottom */}
        <div className="p-4 border-t border-purple-950/40 flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition cursor-pointer"
            id="btn-admin-logout"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-purple-950 text-pink-300 text-[10px] font-mono border border-purple-900/30 rounded cursor-pointer hover:bg-purple-900"
            id="btn-admin-exit-direct"
          >
            Store UI
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-950 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Status notification area */}
        {crudSuccess && (
          <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2 animate-bounce">
            <CheckCircle className="w-4.5 h-4.5" /> {crudSuccess}
          </div>
        )}
        {crudError && (
          <div className="p-3.5 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4.5 h-4.5" /> {crudError}
          </div>
        )}

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && !showAddForm && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Boutique Health</h2>
                <p className="text-purple-400 text-xs mt-0.5">Live metrics and revenue overview for Luki Charms Pakistan.</p>
              </div>

              <button
                onClick={fetchAdminData}
                disabled={loadingStats}
                className="p-2 bg-purple-950 border border-purple-900/40 text-pink-300 hover:text-white rounded-full cursor-pointer hover:bg-purple-900 disabled:opacity-40 transition"
                id="btn-refresh-stats"
                title="Refresh stats"
              >
                <RefreshCw className={`w-4 h-4 ${loadingStats ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Glowing Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-purple-950/50 p-4 rounded-xl relative overflow-hidden">
                <span className="block text-[10px] font-mono text-purple-400 uppercase">Gross Revenue:</span>
                <p className="text-2xl font-bold font-mono text-pink-300 mt-1">
                  Rs. {stats?.revenue.toLocaleString() || '0'}
                </p>
                <span className="text-[9px] text-purple-500 block mt-1">Calculated from active orders</span>
                <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-pink-900/10 border border-pink-500/20 text-pink-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-slate-900 border border-purple-950/50 p-4 rounded-xl relative overflow-hidden">
                <span className="block text-[10px] font-mono text-purple-400 uppercase">Total Orders:</span>
                <p className="text-2xl font-bold font-mono text-white mt-1">
                  {stats?.ordersCount || '0'}
                </p>
                <span className="text-[9px] text-purple-500 block mt-1">Including pending & cancelled</span>
                <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-purple-900/20 border border-purple-700/20 text-purple-300">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-slate-900 border border-purple-950/50 p-4 rounded-xl relative overflow-hidden">
                <span className="block text-[10px] font-mono text-purple-400 uppercase">Pending Delivery:</span>
                <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
                  {stats?.pendingOrdersCount || '0'}
                </p>
                <span className="text-[9px] text-amber-500/80 block mt-1">Requires package dispatch</span>
                <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-amber-400">
                  <Truck className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-slate-900 border border-purple-950/50 p-4 rounded-xl relative overflow-hidden">
                <span className="block text-[10px] font-mono text-purple-400 uppercase">Low/No Stock:</span>
                <p className="text-2xl font-bold font-mono text-red-400 mt-1">
                  {stats?.outOfStockCount || '0'}
                </p>
                <span className="text-[9px] text-red-500 block mt-1">Products needing restock</span>
                <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Custom SVG Sales History Chart (or visual summary) */}
            <div className="bg-slate-900 border border-purple-950/60 rounded-xl p-5 space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Sales Performance Overview</h3>
              <div className="h-44 flex items-end justify-between gap-2 bg-slate-950/60 p-4 rounded-lg border border-purple-950/40 relative">
                
                {/* Horizontal guide lines */}
                <div className="absolute inset-x-0 top-1/4 h-px bg-purple-950/20" />
                <div className="absolute inset-x-0 top-2/4 h-px bg-purple-950/20" />
                <div className="absolute inset-x-0 top-3/4 h-px bg-purple-950/20" />

                {/* Simulated bar points based on orders logs */}
                {orders.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-purple-400 italic">No sales tracked yet today.</div>
                ) : (
                  [...orders].reverse().slice(0, 10).map((ord, idx) => {
                    const normalizedHeight = Math.min(100, Math.max(15, (ord.total / 15000) * 100));
                    return (
                      <div key={ord.id} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                        <div
                          style={{ height: `${normalizedHeight}%` }}
                          className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-purple-950 via-purple-700 to-pink-500 shadow-md shadow-pink-500/10 group-hover:opacity-85 transition-all duration-300"
                        />
                        <span className="text-[8px] font-mono text-purple-400 block mt-1.5 truncate max-w-[40px]">
                          {ord.customerName.split(' ')[0]}
                        </span>

                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full mb-1 bg-slate-900 border border-purple-800 text-[10px] text-white px-2 py-1 rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">
                          {ord.customerName} <br />
                          <strong className="text-pink-400">Rs. {ord.total.toLocaleString()}</strong>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <p className="text-[10px] text-purple-400 text-center">Visualizes your last 10 order amounts chronologically across Pakistan.</p>
            </div>
          </div>
        )}

        {/* --- PRODUCTS TAB --- */}
        {activeTab === 'products' && !showAddForm && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Bracelet Collections</h2>
                <p className="text-purple-400 text-xs mt-0.5">Add, revise, or clear bracelets from the catalog.</p>
              </div>

              <button
                onClick={handleOpenAddForm}
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-800 to-pink-700 hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-500/20 cursor-pointer"
                id="btn-admin-add-product"
              >
                <Plus className="w-4 h-4" /> Add New Bracelet
              </button>
            </div>

            {/* Products grid table list */}
            <div className="bg-slate-900 border border-purple-950/60 rounded-xl overflow-hidden">
              <div className="p-4 bg-slate-950/40 border-b border-purple-950/40 text-xs font-mono font-bold text-purple-400 grid grid-cols-12 gap-2">
                <span className="col-span-5 md:col-span-6">Product Details</span>
                <span className="col-span-3 md:col-span-2 text-center">Category</span>
                <span className="col-span-2 text-right">Price (PKR)</span>
                <span className="col-span-2 md:col-span-2 text-center">Actions</span>
              </div>

              <div className="divide-y divide-purple-950/20 max-h-[500px] overflow-y-auto">
                {allProducts.length === 0 ? (
                  <p className="p-8 text-center text-xs text-purple-400 italic">No products currently listed.</p>
                ) : (
                  allProducts.map((prod) => (
                    <div key={prod.id} className="p-4 grid grid-cols-12 gap-2 items-center text-xs" id={`admin-product-row-${prod.id}`}>
                      {/* Name / Thumb */}
                      <div className="col-span-5 md:col-span-6 flex gap-3 items-center min-w-0 text-left">
                        <img src={prod.images[0]} alt="" referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded border border-purple-900/30 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{prod.name}</p>
                          <p className="text-[10px] text-purple-400 font-mono">Stock: <span className={prod.stock > 0 ? 'text-emerald-400' : 'text-red-400 font-bold'}>{prod.stock}</span></p>
                        </div>
                      </div>

                      {/* Category */}
                      <span className="col-span-3 md:col-span-2 text-center text-purple-300 font-mono">
                        {prod.category}
                      </span>

                      {/* Price */}
                      <span className="col-span-2 text-right font-mono text-pink-300 font-semibold">
                        Rs. {prod.price.toLocaleString()}
                      </span>

                      {/* Actions */}
                      <div className="col-span-2 md:col-span-2 flex justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditForm(prod)}
                          className="p-1.5 rounded bg-slate-950 hover:bg-purple-900/40 border border-purple-900/30 text-purple-300 hover:text-white cursor-pointer"
                          id={`btn-admin-edit-${prod.id}`}
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 rounded bg-slate-950 hover:bg-red-950/40 border border-purple-900/30 text-red-400 hover:text-red-300 cursor-pointer"
                          id={`btn-admin-delete-${prod.id}`}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- PRODUCT ADD / EDIT FORM OVERLAY --- */}
        {showAddForm && (
          <div className="bg-slate-900 border border-purple-950/60 rounded-xl p-5 sm:p-6 space-y-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-purple-950/40">
              <h2 className="font-serif text-lg font-bold text-white">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Curate New Masterpiece'}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                }}
                className="p-1.5 rounded-full bg-slate-950 text-purple-300 hover:text-white transition cursor-pointer"
                id="btn-close-product-form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4" id="form-product-edit">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Bracelet Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Amethyst Glow Cascade"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* Prices */}
                <div>
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 4500"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Original Retail Price (Optional for strike)</label>
                  <input
                    type="number"
                    placeholder="e.g. 6000"
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>

                {/* Category & Stock */}
                <div>
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Boutique Category *</label>
                  <select
                    value={prodCategory}
                    onChange={(e: any) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 cursor-pointer"
                  >
                    {['Charm', 'Handmade', 'Luxury', 'Pearl', 'Crystal', 'Fashion', 'Customized'].map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-950 text-purple-200">{cat} Bracelets</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Stock Amount *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>

                {/* Images URL selection */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Image URL(s) * (comma-separated for multi-image)</label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={prodImages}
                    onChange={(e) => setProdImages(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500"
                  />

                  {/* Preset quick picker */}
                  <div className="mt-2.5">
                    <span className="block text-[9px] font-mono text-purple-400 mb-1.5">Quick selection of premium preset images:</span>
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {presetImages.map((pUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setProdImages(pUrl)}
                          className="w-12 aspect-square rounded border border-purple-900/30 overflow-hidden flex-shrink-0 cursor-pointer hover:border-pink-500 transition"
                          title="Select preset image"
                        >
                          <img src={pUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Materials, colors, tags */}
                <div>
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Materials (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Sterling Silver, Freshwater Pearl"
                    value={prodMaterials}
                    onChange={(e) => setProdMaterials(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Colors (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Lavender Purple, Imperial Gold"
                    value={prodColors}
                    onChange={(e) => setProdColors(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Styles / Tags (comma-separated: 'Featured', 'Best Seller', 'New')</label>
                  <input
                    type="text"
                    placeholder="Featured, Best Seller, Royal, Amethyst"
                    value={prodTags}
                    onChange={(e) => setProdTags(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">Bespoke Description</label>
                  <textarea
                    rows={4}
                    placeholder="Write a rich, elegant story describing this bracelet..."
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-purple-900/40 text-purple-200 placeholder-purple-400/30 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-purple-950/40 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-full border border-purple-900/40 text-purple-300 hover:text-white text-xs font-semibold hover:bg-purple-950/20 cursor-pointer"
                  id="btn-add-form-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-800 to-pink-700 hover:opacity-90 text-white text-xs font-bold cursor-pointer"
                  id="btn-add-form-save"
                >
                  {editingProduct ? 'Save Revisions' : 'Publish Masterpiece'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- ORDERS LOG TAB --- */}
        {activeTab === 'orders' && !showAddForm && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Orders Log</h2>
              <p className="text-purple-400 text-xs mt-0.5">Fulfill shipments, update dispatch status, and manage client records.</p>
            </div>

            <div className="bg-slate-900 border border-purple-950/60 rounded-xl overflow-hidden">
              <div className="divide-y divide-purple-950/20 max-h-[520px] overflow-y-auto">
                {orders.length === 0 ? (
                  <p className="p-8 text-center text-xs text-purple-400 italic">No orders logged yet.</p>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.id} className="p-4 sm:p-5 flex flex-col space-y-4 text-xs" id={`order-row-${ord.id}`}>
                      {/* Order top line info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/40 border border-purple-950/40 rounded-lg p-3">
                        <div className="space-y-0.5">
                          <p className="font-bold text-white font-serif flex items-center gap-2">
                            <span>ID: {ord.id}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-pink-300 border border-purple-900/30 font-mono font-normal">
                              {ord.trackingCode}
                            </span>
                          </p>
                          <p className="text-[10px] text-purple-400 font-mono">Placed on: {ord.date}</p>
                        </div>

                        {/* Status dropdown selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-purple-400 uppercase">Fulfillment:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className={`text-[11px] font-bold rounded-full px-3 py-1 bg-slate-950 border cursor-pointer outline-none ${
                              ord.status === 'Pending' ? 'border-amber-500/50 text-amber-400' :
                              ord.status === 'Shipped' ? 'border-blue-500/50 text-blue-400' :
                              ord.status === 'Delivered' ? 'border-emerald-500/50 text-emerald-400' :
                              'border-red-500/50 text-red-400'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Client billing address and products ordered */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* client info */}
                        <div className="md:col-span-5 space-y-1 text-left bg-slate-950/20 border border-purple-950/10 p-3 rounded-lg">
                          <span className="block text-[9px] font-mono text-purple-400 uppercase tracking-wider mb-1">Billing Client</span>
                          <p className="text-white font-bold">{ord.customerName}</p>
                          <p className="text-purple-300">📞 {ord.customerPhone}</p>
                          <p className="text-purple-300">✉️ {ord.customerEmail}</p>
                          <p className="text-purple-300">📍 {ord.customerAddress}, {ord.customerCity}</p>
                        </div>

                        {/* products ordered */}
                        <div className="md:col-span-7 space-y-2 text-left bg-slate-950/20 border border-purple-950/10 p-3 rounded-lg">
                          <span className="block text-[9px] font-mono text-purple-400 uppercase tracking-wider mb-1">Ordered Bracelets</span>
                          <div className="space-y-1.5 max-h-[110px] overflow-y-auto">
                            {ord.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[11px]">
                                <span className="text-purple-200 font-serif font-semibold truncate pr-4 max-w-[220px]">
                                  {item.name} <strong className="text-pink-400 font-mono font-normal">x{item.quantity}</strong>
                                </span>
                                <span className="font-mono text-purple-400">Rs. {item.price.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>

                          <div className="h-px bg-purple-950/30 my-2" />
                          
                          <div className="flex justify-between items-center text-xs font-bold text-white">
                            <span>Subtotal:</span>
                            <span className="text-pink-300 font-mono">Rs. {ord.subtotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- INVENTORY TAB --- */}
        {activeTab === 'inventory' && !showAddForm && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Inventory Stock Monitor</h2>
              <p className="text-purple-400 text-xs mt-0.5">Quick stock injection and low stock tracking alerts.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {allProducts.map((prod) => {
                const isLow = prod.stock <= 5;
                const outOfStock = prod.stock <= 0;
                return (
                  <div
                    key={prod.id}
                    className={`bg-slate-900 border rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-all ${
                      outOfStock ? 'border-red-500/40 bg-red-950/5' : isLow ? 'border-amber-500/40 bg-amber-950/5' : 'border-purple-950/50'
                    }`}
                  >
                    <div className="flex gap-3 items-center text-left">
                      <img src={prod.images[0]} alt="" referrerPolicy="no-referrer" className="w-12 h-12 object-cover rounded border border-purple-950/40" />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-white">{prod.name}</h4>
                        <span className="text-[10px] text-purple-400 font-mono uppercase tracking-wider mr-3">{prod.category}</span>
                        <span className={`text-[10px] font-mono font-bold uppercase ${outOfStock ? 'text-red-400 animate-pulse' : isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {outOfStock ? 'SOLD OUT' : isLow ? 'LOW STOCK ALERT' : 'STOCK HEALTHY'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="text-right sm:text-right">
                        <span className="block text-[9px] font-mono text-purple-400 uppercase">Available Quantity:</span>
                        <span className={`text-xl font-bold font-mono ${outOfStock ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-white'}`}>
                          {prod.stock}
                        </span>
                      </div>

                      {/* Stock Quick Injection Adders */}
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleQuickRestock(prod, 5)}
                          className="px-2.5 py-1.5 rounded bg-purple-950 hover:bg-purple-900 text-pink-300 font-mono font-bold text-xs border border-purple-800/40 cursor-pointer transition"
                          title="Add 5 units"
                          id={`btn-restock-5-${prod.id}`}
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleQuickRestock(prod, 15)}
                          className="px-2.5 py-1.5 rounded bg-purple-950 hover:bg-purple-900 text-pink-300 font-mono font-bold text-xs border border-purple-800/40 cursor-pointer transition"
                          title="Add 15 units"
                          id={`btn-restock-15-${prod.id}`}
                        >
                          +15
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
