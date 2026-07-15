export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in PKR
  originalPrice?: number; // for showing discount
  rating: number;
  reviews: Review[];
  category: 'Charm' | 'Handmade' | 'Luxury' | 'Pearl' | 'Crystal' | 'Fashion' | 'Customized';
  images: string[];
  stock: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  materials: string[];
  colors: string[];
  tags: string[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  trackingCode: string;
}

export interface DashboardStats {
  revenue: number;
  ordersCount: number;
  pendingOrdersCount: number;
  productsCount: number;
  outOfStockCount: number;
}
