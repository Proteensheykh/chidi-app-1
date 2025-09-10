import { Customer, CustomerStatus } from '../types';
import { createNotification } from '../../notifications/services/notification-service';
import { Notification } from '../../notifications/types';

/**
 * Adds a new customer and generates a notification
 */
export function addCustomer(
  customers: Customer[],
  newCustomer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrder' | 'joinDate'>
): { updatedCustomers: Customer[]; notification: Notification } {
  // Generate a new ID (in a real app, this would be handled by the backend)
  const maxId = Math.max(...customers.map(c => c.id), 0);
  
  // Get current date for join date
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'short' });
  const year = currentDate.getFullYear();
  
  const customerWithId: Customer = {
    ...newCustomer,
    id: maxId + 1,
    totalOrders: 0,
    totalSpent: '₦0',
    lastOrder: 'Never',
    joinDate: `${month} ${year}`
  };
  
  const notification = createNotification(
    "activity",
    "Customer Added",
    `${newCustomer.name} has been added to your customer list`,
    "low"
  );
  
  return {
    updatedCustomers: [...customers, customerWithId],
    notification
  };
}

/**
 * Updates a customer's information
 */
export function updateCustomer(
  customers: Customer[],
  updatedCustomer: Customer
): { updatedCustomers: Customer[]; notification: Notification } {
  const updatedCustomers = customers.map(customer => 
    customer.id === updatedCustomer.id ? updatedCustomer : customer
  );
  
  const notification = createNotification(
    "activity",
    "Customer Updated",
    `${updatedCustomer.name}'s information has been updated`,
    "low"
  );
  
  return { updatedCustomers, notification };
}

/**
 * Updates a customer's status
 */
export function updateCustomerStatus(
  customers: Customer[],
  customerId: number,
  newStatus: CustomerStatus
): { updatedCustomers: Customer[]; notification: Notification } {
  const customer = customers.find(c => c.id === customerId);
  if (!customer) {
    throw new Error(`Customer with ID ${customerId} not found`);
  }
  
  const updatedCustomers = customers.map(c => 
    c.id === customerId ? { ...c, status: newStatus } : c
  );
  
  const notification = createNotification(
    "activity",
    "Customer Status Updated",
    `${customer.name}'s status changed to ${newStatus}`,
    "low"
  );
  
  return { updatedCustomers, notification };
}

/**
 * Updates a customer's order statistics after a new order
 */
export function updateCustomerOrderStats(
  customers: Customer[],
  customerId: number,
  orderTotal: string
): { updatedCustomers: Customer[] } {
  const customer = customers.find(c => c.id === customerId);
  if (!customer) {
    throw new Error(`Customer with ID ${customerId} not found`);
  }
  
  // Parse the order total and current total spent
  const orderAmount = Number.parseInt(orderTotal.replace(/[₦,]/g, ""));
  const currentSpent = Number.parseInt(customer.totalSpent.replace(/[₦,]/g, ""));
  const newTotalSpent = `₦${(currentSpent + orderAmount).toLocaleString()}`;
  
  const updatedCustomers = customers.map(c => 
    c.id === customerId 
      ? { 
          ...c, 
          totalOrders: c.totalOrders + 1,
          totalSpent: newTotalSpent,
          lastOrder: "Just now",
          // If customer has made more than 10 orders or spent more than ₦250,000, mark as VIP
          status: (c.totalOrders + 1 > 10 || (currentSpent + orderAmount) > 250000) ? "vip" : c.status
        } 
      : c
  );
  
  return { updatedCustomers };
}
