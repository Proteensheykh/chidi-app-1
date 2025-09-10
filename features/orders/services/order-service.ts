import { Order, OrderStatus, PaymentStatus } from '../types';
import { createNotification } from '../../notifications/services/notification-service';
import { Notification } from '../../notifications/types';
import { Product } from '../../catalogue/types';

/**
 * Creates a new order and generates a notification
 */
export function createOrder(
  orders: Order[],
  newOrder: Omit<Order, 'id' | 'orderNumber'>
): { updatedOrders: Order[]; notification: Notification } {
  // Generate a new ID (in a real app, this would be handled by the backend)
  const maxId = Math.max(...orders.map(o => o.id), 0);
  
  // Generate order number
  const year = new Date().getFullYear();
  const orderCount = orders.length + 1;
  const orderNumber = `ORD-${year}-${orderCount.toString().padStart(3, '0')}`;
  
  const orderWithId: Order = {
    ...newOrder,
    id: maxId + 1,
    orderNumber
  };
  
  const notification = createNotification(
    "sale",
    "New Order Created",
    `Order #${orderNumber} created for ${newOrder.customerName} - ${newOrder.total}`,
    "medium"
  );
  
  return {
    updatedOrders: [...orders, orderWithId],
    notification
  };
}

/**
 * Updates an order's status and generates a notification
 */
export function updateOrderStatus(
  orders: Order[],
  orderId: number,
  status: OrderStatus
): { updatedOrders: Order[]; notification: Notification } {
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`);
  }
  
  const updatedOrders = orders.map(order => 
    order.id === orderId ? { ...order, status } : order
  );
  
  const notification = createNotification(
    "activity",
    "Order Status Updated",
    `Order #${order.orderNumber} status changed to ${status}`,
    "low"
  );
  
  return { updatedOrders, notification };
}

/**
 * Updates an order's payment status
 */
export function updatePaymentStatus(
  orders: Order[],
  orderId: number,
  paymentStatus: PaymentStatus
): { updatedOrders: Order[]; notification: Notification } {
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`);
  }
  
  const updatedOrders = orders.map(order => 
    order.id === orderId ? { ...order, paymentStatus } : order
  );
  
  const notification = createNotification(
    "activity",
    "Payment Status Updated",
    `Order #${order.orderNumber} payment status changed to ${paymentStatus}`,
    "medium"
  );
  
  return { updatedOrders, notification };
}

/**
 * Updates product stock levels based on order creation
 */
export function updateStockFromOrder(
  products: Product[],
  orderItems: Order['items']
): { updatedProducts: Product[] } {
  const updatedProducts = [...products];
  
  orderItems.forEach(item => {
    const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
    if (productIndex !== -1) {
      const product = updatedProducts[productIndex];
      const newStock = Math.max(0, product.stock - item.quantity);
      
      updatedProducts[productIndex] = {
        ...product,
        stock: newStock,
        status: newStock === 0 ? "out" : newStock <= 3 ? "low" : "good"
      };
    }
  });
  
  return { updatedProducts };
}
