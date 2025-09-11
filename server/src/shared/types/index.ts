export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RequestUser {
  id: string;
  clerkId: string;
  email: string;
  ownerName?: string;
  isOnboarded: boolean;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION'
}

export interface DatabaseUser {
  id: string;
  clerkId: string;
  email: string;
  ownerName?: string | null;
  phone?: string | null;
  image?: string | null;
  businessName?: string | null;
  businessCategory?: string | null;
  businessDescription?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  status: UserStatus;
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export * from './api';
