import { useState, useCallback } from 'react';
import { Customer, INITIAL_CUSTOMERS, CustomerStatus } from '../types';
import { 
  addCustomer as addCustomerService,
  updateCustomer as updateCustomerService,
  updateCustomerStatus as updateCustomerStatusService,
  updateCustomerOrderStats as updateCustomerOrderStatsService
} from '../services/customer-service';

interface UseCustomersProps {
  initialCustomers?: Customer[];
  addNotification: (notification: any) => void;
}

export function useCustomers({ 
  initialCustomers = INITIAL_CUSTOMERS,
  addNotification 
}: UseCustomersProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  
  const addCustomer = useCallback((newCustomer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrder' | 'joinDate'>) => {
    const { updatedCustomers, notification } = addCustomerService(customers, newCustomer);
    setCustomers(updatedCustomers);
    addNotification(notification);
  }, [customers, addNotification]);
  
  const updateCustomer = useCallback((updatedCustomer: Customer) => {
    const { updatedCustomers, notification } = updateCustomerService(customers, updatedCustomer);
    setCustomers(updatedCustomers);
    addNotification(notification);
  }, [customers, addNotification]);
  
  const updateCustomerStatus = useCallback((customerId: number, newStatus: CustomerStatus) => {
    const { updatedCustomers, notification } = updateCustomerStatusService(customers, customerId, newStatus);
    setCustomers(updatedCustomers);
    addNotification(notification);
  }, [customers, addNotification]);
  
  const updateCustomerOrderStats = useCallback((customerId: number, orderTotal: string) => {
    const { updatedCustomers } = updateCustomerOrderStatsService(customers, customerId, orderTotal);
    setCustomers(updatedCustomers);
  }, [customers]);
  
  return {
    customers,
    addCustomer,
    updateCustomer,
    updateCustomerStatus,
    updateCustomerOrderStats,
    setCustomers // Expose this for initial data loading
  };
}
