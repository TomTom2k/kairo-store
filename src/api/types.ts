// ============================================
// Product Types
// ============================================

export interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  images: string[];
  description: string;
  category: string;
  rating: number;
  quantity: number;
  badge: string | null;
  careLight?: string | null;
  careWater?: string | null;
  careTemperature?: string | null;
  careFertilizer?: string | null;
}

// ============================================
// Cart Types
// ============================================

export interface CartItem {
  id: string; // Unique cart item ID
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// ============================================
// Order Types
// ============================================

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPING = "shipping",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  guestInfo: GuestInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "COD" | "BANK_TRANSFER";
  createdAt: Date;
  estimatedDelivery: Date;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
