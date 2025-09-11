/**
 * Shelved Feature Types
 * 
 * This file contains type definitions for features that have been shelved for v2.
 * These types are used to maintain TypeScript compatibility when the features are disabled.
 */

// Customer types
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders?: number;
  totalSpent?: number;
  lastOrderDate?: Date;
  notes?: string;
  status?: 'active' | 'inactive';
}

// Order types
export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  date: Date | string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  notes?: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}
