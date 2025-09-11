import { z } from 'zod';

export const commonValidationSchemas = {
  // ID validation
  id: z.string().cuid('Invalid ID format'),
  
  // Email validation
  email: z.string().email('Invalid email format'),
  
  // Phone validation (flexible for international numbers)
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format').optional(),
  
  // Name validation
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  
  // Business name validation
  businessName: z.string().min(1, 'Business name is required').max(100, 'Business name too long'),
  
  // Category validation
  category: z.string().min(1, 'Category is required').max(50, 'Category too long'),
  
  // Description validation
  description: z.string().max(500, 'Description too long').optional(),
  
  // Address validation
  address: z.string().max(200, 'Address too long').optional(),
  
  // City validation
  city: z.string().max(50, 'City name too long').optional(),
  
  // State validation
  state: z.string().max(50, 'State name too long').optional(),
  
  // Country validation
  country: z.string().max(50, 'Country name too long').optional(),
  
  // Pagination
  page: z.string().regex(/^\d+$/, 'Page must be a number').transform(Number).refine(n => n > 0, 'Page must be greater than 0').optional(),
  
  limit: z.string().regex(/^\d+$/, 'Limit must be a number').transform(Number).refine(n => n > 0 && n <= 100, 'Limit must be between 1 and 100').optional(),
  
  // Sort order
  sortOrder: z.enum(['asc', 'desc']).optional(),
};

export const paginationSchema = z.object({
  page: commonValidationSchemas.page,
  limit: commonValidationSchemas.limit,
  sortBy: z.string().optional(),
  sortOrder: commonValidationSchemas.sortOrder,
});

export const searchSchema = paginationSchema.extend({
  search: z.string().max(100, 'Search term too long').optional(),
  filter: z.string().max(50, 'Filter too long').optional(),
});

// Utility functions
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

export const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters except +
  return phone.replace(/[^\d+]/g, '');
};
