import { Product, ProductStatus } from '../types';
import { createNotification } from '../../notifications/services/notification-service';
import { Notification } from '../../notifications/types';

/**
 * Determines the stock status based on quantity
 */
export function getStockStatus(stock: number): ProductStatus {
  if (stock === 0) return "out";
  if (stock <= 3) return "low";
  return "good";
}

/**
 * Updates a product's stock and generates a notification if stock was increased
 */
export function updateProductStock(
  product: Product,
  newStock: number
): { updatedProduct: Product; notification?: Notification } {
  const originalStock = product.stock;
  const updatedProduct = {
    ...product,
    stock: newStock,
    status: getStockStatus(newStock)
  };
  
  // Create notification if stock was increased
  if (newStock > originalStock) {
    const notification = createNotification(
      "activity",
      "Product Restocked",
      `${product.name} restocked from ${originalStock} to ${newStock} units`,
      "medium"
    );
    return { updatedProduct, notification };
  }
  
  return { updatedProduct };
}

/**
 * Adds a new product and generates a notification
 */
export function addProduct(
  products: Product[],
  newProduct: Omit<Product, 'id' | 'status'>
): { updatedProducts: Product[]; notification: Notification } {
  // Generate a new ID (in a real app, this would be handled by the backend)
  const maxId = Math.max(...products.map(p => p.id), 0);
  const productWithId = {
    ...newProduct,
    id: maxId + 1,
    status: getStockStatus(newProduct.stock)
  };
  
  const notification = createNotification(
    "activity",
    "Product Added",
    `${newProduct.name} has been added to your inventory with ${newProduct.stock} units`,
    "low"
  );
  
  return {
    updatedProducts: [...products, productWithId],
    notification
  };
}

/**
 * Deletes products and generates a notification
 */
export function deleteProducts(
  products: Product[],
  productIds: number[]
): { updatedProducts: Product[]; notification: Notification } {
  const updatedProducts = products.filter(product => !productIds.includes(product.id));
  
  const notification = createNotification(
    "activity",
    "Products Deleted",
    `${productIds.length} product${productIds.length > 1 ? "s" : ""} deleted from inventory`,
    "medium"
  );
  
  return { updatedProducts, notification };
}

/**
 * Updates a product and generates a notification if stock was changed
 */
export function updateProduct(
  products: Product[],
  updatedProduct: Product
): { updatedProducts: Product[]; notification?: Notification } {
  const originalProduct = products.find(p => p.id === updatedProduct.id);
  const updatedProducts = products.map(product => 
    product.id === updatedProduct.id ? updatedProduct : product
  );
  
  // If stock was increased, generate a notification
  if (originalProduct && updatedProduct.stock > originalProduct.stock) {
    const { notification } = updateProductStock(originalProduct, updatedProduct.stock);
    return { updatedProducts, notification };
  }
  
  return { updatedProducts };
}
