import { Notification, NotificationType, NotificationTitle, NotificationPriority } from '../types';

export function createNotification(
  type: NotificationType,
  title: NotificationTitle,
  message: string,
  priority: NotificationPriority,
  id?: string
): Notification {
  return {
    id: id || `${type}-${Date.now()}`,
    type,
    title,
    message,
    timestamp: "Just now",
    read: false,
    priority
  };
}

export function createStockNotification(
  product: { id: number; name: string; stock: number }
): Notification {
  if (product.stock === 0) {
    return createNotification(
      "stock",
      "Out of Stock",
      `${product.name} is completely out of stock`,
      "high",
      `stock-${product.id}-${Date.now()}`
    );
  } else if (product.stock <= 3) {
    return createNotification(
      "stock",
      "Low Stock Alert",
      `${product.name} is running low (${product.stock} units left)`,
      "high",
      `stock-${product.id}-${Date.now()}`
    );
  }
  throw new Error("Product stock level doesn't warrant notification");
}

export function checkStockLevels(products: any[], existingNotifications: Notification[]): Notification[] {
  const newNotifications: Notification[] = [];
  
  products.forEach((product) => {
    const existingStockAlert = existingNotifications.find(
      (n) => n.type === "stock" && n.message.includes(product.name)
    );
    
    if (!existingStockAlert) {
      try {
        if (product.stock === 0 || (product.stock <= 3 && product.stock > 0)) {
          newNotifications.push(createStockNotification(product));
        }
      } catch (error) {
        // Stock level doesn't warrant notification
      }
    }
  });
  
  return newNotifications;
}
