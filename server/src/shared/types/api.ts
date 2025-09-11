import { Request } from 'express';
import { RequestUser } from './index';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: RequestUser;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchQuery extends PaginationQuery {
  search?: string;
  filter?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}
