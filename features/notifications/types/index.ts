export type NotificationType = "stock" | "activity" | "system" | "sale";

export type NotificationTitle = 
  | "Out of Stock" 
  | "Low Stock Alert" 
  | "Product Added" 
  | "Product Restocked" 
  | "Welcome to CHIDI!" 
  | "Profile Updated" 
  | "Products Deleted" 
  | "Customer Added" 
  | "Customer Updated" 
  | "Customer Status Updated" 
  | "New Order Created" 
  | "Order Status Updated" 
  | "Payment Status Updated";

export type NotificationPriority = "high" | "medium" | "low";

export interface Notification {
  id: string;
  type: NotificationType;
  title: NotificationTitle;
  message: string;
  timestamp: string;
  read: boolean;
  priority: NotificationPriority;
}
