import { useState, useCallback } from 'react';
import { Order, OrderStatus, PaymentStatus, INITIAL_ORDERS } from '../types';
import { 
  createOrder as createOrderService,
  updateOrderStatus as updateOrderStatusService,
  updatePaymentStatus as updatePaymentStatusService,
  updateStockFromOrder as updateStockFromOrderService
} from '../services/order-service';
import { Product } from '../../catalogue/types';
import { updateCustomerOrderStats } from '../../customers/services/customer-service';

interface UseOrdersProps {
  initialOrders?: Order[];
  addNotification: (notification: any) => void;
  updateCustomerStats?: (customerId: number, orderTotal: string) => void;
  products?: Product[];
  updateProducts?: (updatedProducts: Product[]) => void;
}

export function useOrders({ 
  initialOrders = INITIAL_ORDERS,
  addNotification,
  updateCustomerStats,
  products,
  updateProducts
}: UseOrdersProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  const createOrder = useCallback((newOrder: Omit<Order, 'id' | 'orderNumber'>) => {
    const { updatedOrders, notification } = createOrderService(orders, newOrder);
    setOrders(updatedOrders);
    addNotification(notification);
    
    // Update customer stats if function is provided
    if (updateCustomerStats) {
      updateCustomerStats(newOrder.customerId, newOrder.total);
    }
    
    // Update product stock if products and update function are provided
    if (products && updateProducts) {
      const { updatedProducts } = updateStockFromOrderService(products, newOrder.items);
      updateProducts(updatedProducts);
    }
    
    // Return the created order (last in the array)
    return updatedOrders[updatedOrders.length - 1];
  }, [orders, addNotification, updateCustomerStats, products, updateProducts]);
  
  const updateOrderStatus = useCallback((orderId: number, status: OrderStatus) => {
    const { updatedOrders, notification } = updateOrderStatusService(orders, orderId, status);
    setOrders(updatedOrders);
    addNotification(notification);
  }, [orders, addNotification]);
  
  const updatePaymentStatus = useCallback((orderId: number, paymentStatus: PaymentStatus) => {
    const { updatedOrders, notification } = updatePaymentStatusService(orders, orderId, paymentStatus);
    setOrders(updatedOrders);
    addNotification(notification);
  }, [orders, addNotification]);
  
  return {
    orders,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    setOrders // Expose this for initial data loading
  };
}
