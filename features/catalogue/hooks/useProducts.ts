import { useState, useCallback } from 'react';
import { Product, INITIAL_PRODUCTS } from '../types';
import { 
  addProduct as addProductService,
  updateProduct as updateProductService,
  deleteProducts as deleteProductsService
} from '../services/product-service';

interface UseProductsProps {
  initialProducts?: Product[];
  addNotification: (notification: any) => void;
}

export function useProducts({ 
  initialProducts = INITIAL_PRODUCTS,
  addNotification 
}: UseProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  const addProduct = useCallback((newProduct: Omit<Product, 'id' | 'status'>) => {
    const { updatedProducts, notification } = addProductService(products, newProduct);
    setProducts(updatedProducts);
    addNotification(notification);
  }, [products, addNotification]);
  
  const updateProduct = useCallback((updatedProduct: Product) => {
    const { updatedProducts, notification } = updateProductService(products, updatedProduct);
    setProducts(updatedProducts);
    
    if (notification) {
      addNotification(notification);
    }
  }, [products, addNotification]);
  
  const deleteProducts = useCallback((productIds: number[]) => {
    const { updatedProducts, notification } = deleteProductsService(products, productIds);
    setProducts(updatedProducts);
    addNotification(notification);
  }, [products, addNotification]);
  
  return {
    products,
    addProduct,
    updateProduct,
    deleteProducts,
    setProducts // Expose this for initial data loading
  };
}
