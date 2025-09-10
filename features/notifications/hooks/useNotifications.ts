import { useState, useEffect, useCallback } from 'react';
import { Notification } from '../types';
import { checkStockLevels, createNotification } from '../services/notification-service';
import { Product } from '../../inventory/types';

interface UseNotificationsProps {
  initialProducts?: Product[];
}

export function useNotifications(initialProducts?: Product[]) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Check stock levels when products change
  useEffect(() => {
    if (initialProducts) {
      const newStockNotifications = checkStockLevels(initialProducts, notifications);
      if (newStockNotifications.length > 0) {
        setNotifications(prev => [...newStockNotifications, ...prev]);
      }
    }
  }, [initialProducts, notifications]);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    dismissNotification,
  };
}
