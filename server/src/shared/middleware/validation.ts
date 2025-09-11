import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ResponseUtil } from '@/shared/utils';

export class ValidationMiddleware {
  /**
   * Validate request body against Zod schema
   */
  static validateBody<T>(schema: ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        const result = schema.safeParse(req.body);
        
        if (!result.success) {
          const errors: Record<string, string[]> = {};
          
          result.error.errors.forEach((error) => {
            const path = error.path.join('.');
            if (!errors[path]) {
              errors[path] = [];
            }
            errors[path].push(error.message);
          });

          ResponseUtil.error(res, 'Validation failed', 400, errors);
          return;
        }

        req.body = result.data;
        next();
      } catch (error) {
        ResponseUtil.serverError(res, 'Validation error');
        return;
      }
    };
  }

  /**
   * Validate request query parameters against Zod schema
   */
  static validateQuery<T>(schema: ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        const result = schema.safeParse(req.query);
        
        if (!result.success) {
          const errors: Record<string, string[]> = {};
          
          result.error.errors.forEach((error) => {
            const path = error.path.join('.');
            if (!errors[path]) {
              errors[path] = [];
            }
            errors[path].push(error.message);
          });

          ResponseUtil.error(res, 'Query validation failed', 400, errors);
          return;
        }

        req.query = result.data as any;
        next();
      } catch (error) {
        ResponseUtil.serverError(res, 'Query validation error');
        return;
      }
    };
  }

  /**
   * Validate request params against Zod schema
   */
  static validateParams<T>(schema: ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        const result = schema.safeParse(req.params);
        
        if (!result.success) {
          const errors: Record<string, string[]> = {};
          
          result.error.errors.forEach((error) => {
            const path = error.path.join('.');
            if (!errors[path]) {
              errors[path] = [];
            }
            errors[path].push(error.message);
          });

          ResponseUtil.error(res, 'Parameter validation failed', 400, errors);
          return;
        }

        req.params = result.data as any;
        next();
      } catch (error) {
        ResponseUtil.serverError(res, 'Parameter validation error');
        return;
      }
    };
  }
}
