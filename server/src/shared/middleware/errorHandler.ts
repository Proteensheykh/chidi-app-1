import { Request, Response, NextFunction } from 'express';
import { ResponseUtil, Logger } from '@/shared/utils';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class ErrorHandler {
  /**
   * Global error handling middleware
   */
  static handle(error: AppError, req: Request, res: Response, next: NextFunction): void {
    Logger.error('Unhandled error', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    });

    // Default error response
    const statusCode = error.statusCode || 500;
    const message = error.isOperational ? error.message : 'Internal server error';

    ResponseUtil.error(res, message, statusCode);
  }

  /**
   * Handle 404 errors
   */
  static notFound(req: Request, res: Response, next: NextFunction): void {
    ResponseUtil.notFound(res, `Route ${req.originalUrl} not found`);
  }

  /**
   * Create operational error
   */
  static createError(message: string, statusCode = 400): AppError {
    const error = new Error(message) as AppError;
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
  }
}

/**
 * Async error wrapper for route handlers
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
