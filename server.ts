import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_PRODUCTS } from './src/data/defaultProducts';
import { Product, Order, Review, DashboardStats } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Ensure DB directory exists
  const dbFolder = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
  }

  const dbPath = path.join(dbFolder, 'db.json');

  // Initialize DB JSON file if empty or missing
  let db: { products: Product[]; orders: Order[] } = { products: DEFAULT_PRODUCTS, orders: [] };

  try {
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, 'utf-8');
      if (fileData.trim()) {
        db = JSON.parse(fileData);
        // Fallback if structure is wrong
        if (!db.products || !Array.isArray(db.products)) {
          db.products = DEFAULT_PRODUCTS;
        }
        if (!db.orders || !Array.isArray(db.orders)) {
          db.orders = [];
        }
      } else {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
      }
    } else {
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    }
  } catch (err) {
    console.error('Error initializing db.json, using defaults:', err);
    db = { products: DEFAULT_PRODUCTS, orders: [] };
  }

  // Save utility
  const saveDb = () => {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    } catch (err) {
      console.error('Failed to save db.json:', err);
    }
  };

  // --- API ROUTES ---

  // 1. Get all products
  app.get('/api/products', (req, res) => {
    res.json(db.products);
  });

  // 2. Get single product
  app.get('/api/products/:id', (req, res) => {
    const product = db.products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  // 3. Add product (Admin)
  app.post('/api/products', (req, res) => {
    const { name, description, price, originalPrice, category, images, stock, featured, bestSeller, newArrival, materials, colors, tags } = req.body;
    
    if (!name || !description || !price || !category || !images || images.length === 0) {
      return res.status(400).json({ error: 'Missing required product fields' });
    }

    const newProduct: Product = {
      id: `luki-${category.toLowerCase()}-${Date.now()}`,
      name,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      rating: 5.0,
      reviews: [],
      category,
      images,
      stock: Number(stock) || 0,
      featured: !!featured,
      bestSeller: !!bestSeller,
      newArrival: !!newArrival,
      materials: Array.isArray(materials) ? materials : [],
      colors: Array.isArray(colors) ? colors : [],
      tags: Array.isArray(tags) ? tags : [],
    };

    db.products.unshift(newProduct);
    saveDb();
    res.status(201).json(newProduct);
  });

  // 4. Edit product (Admin)
  app.put('/api/products/:id', (req, res) => {
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedData = req.body;
    db.products[index] = {
      ...db.products[index],
      ...updatedData,
      price: updatedData.price !== undefined ? Number(updatedData.price) : db.products[index].price,
      originalPrice: updatedData.originalPrice !== undefined ? (updatedData.originalPrice ? Number(updatedData.originalPrice) : undefined) : db.products[index].originalPrice,
      stock: updatedData.stock !== undefined ? Number(updatedData.stock) : db.products[index].stock,
    };

    saveDb();
    res.json(db.products[index]);
  });

  // 5. Delete product (Admin)
  app.delete('/api/products/:id', (req, res) => {
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    db.products.splice(index, 1);
    saveDb();
    res.json({ success: true, message: 'Product deleted' });
  });

  // 6. Add a customer review
  app.post('/api/products/:id/review', (req, res) => {
    const { author, rating, comment } = req.body;
    if (!author || !rating || !comment) {
      return res.status(400).json({ error: 'Missing review fields' });
    }

    const product = db.products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author,
      rating: Number(rating),
      comment,
      date: new Date().toISOString().split('T')[0],
    };

    product.reviews.push(newReview);
    
    // Recalculate rating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = parseFloat((totalRating / product.reviews.length).toFixed(1));

    saveDb();
    res.status(201).json(product);
  });

  // 7. Get all orders (Admin)
  app.get('/api/orders', (req, res) => {
    res.json(db.orders);
  });

  // 8. Place a new order
  app.post('/api/orders', (req, res) => {
    const { customerName, customerEmail, customerPhone, customerAddress, customerCity, items, subtotal, shippingFee, total } = req.body;

    if (!customerName || !customerPhone || !customerAddress || !customerCity || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing billing or cart details' });
    }

    // Process stock and check availability
    for (const item of items) {
      const prod = db.products.find((p) => p.id === item.productId);
      if (prod) {
        if (prod.stock < item.quantity) {
          return res.status(400).json({ error: `Not enough stock available for product: ${prod.name}. Available: ${prod.stock}` });
        }
        prod.stock -= item.quantity;
      }
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const order: Order = {
      id: `ORD-${Date.now()}`,
      customerName,
      customerEmail: customerEmail || 'no-email@lukicharms.com',
      customerPhone,
      customerAddress,
      customerCity,
      items,
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee),
      total: Number(total),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      trackingCode: `LC-PAK-${randomSuffix}`,
    };

    db.orders.unshift(order);
    saveDb();
    res.status(201).json(order);
  });

  // 9. Update order status (Admin)
  app.put('/api/orders/:id/status', (req, res) => {
    const { status } = req.body;
    if (!status || !['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }

    const order = db.orders.find((o) => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Revert stock if order is Cancelled and wasn't already Cancelled
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      for (const item of order.items) {
        const prod = db.products.find((p) => p.id === item.productId);
        if (prod) {
          prod.stock += item.quantity;
        }
      }
    }
    // Re-deduct if moved from Cancelled to active
    if (order.status === 'Cancelled' && status !== 'Cancelled') {
      for (const item of order.items) {
        const prod = db.products.find((p) => p.id === item.productId);
        if (prod) {
          prod.stock = Math.max(0, prod.stock - item.quantity);
        }
      }
    }

    order.status = status;
    saveDb();
    res.json(order);
  });

  // 10. Dashboard Stats (Admin)
  app.get('/api/dashboard-stats', (req, res) => {
    const activeOrders = db.orders.filter(o => o.status !== 'Cancelled');
    const revenue = activeOrders.reduce((sum, o) => sum + o.subtotal, 0);
    const pendingOrdersCount = db.orders.filter(o => o.status === 'Pending').length;
    const outOfStockCount = db.products.filter(p => p.stock <= 0).length;

    const stats: DashboardStats = {
      revenue,
      ordersCount: db.orders.length,
      pendingOrdersCount,
      productsCount: db.products.length,
      outOfStockCount,
    };

    res.json(stats);
  });

  // 11. Admin Login (Secure endpoint checking admin credential)
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === 'admin123' || password === 'lukiadmin2026') {
      res.json({ success: true, token: 'luki-charms-admin-token-2026' });
    } else {
      res.status(401).json({ error: 'Invalid admin credentials' });
    }
  });

  // Serve static UI / Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Luxury server running on http://localhost:${PORT}`);
  });
}

startServer();
