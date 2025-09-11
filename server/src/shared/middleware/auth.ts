import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { ResponseUtil, Logger } from '@/shared/utils';
import { RequestUser } from '@/shared/types';
import { prisma } from '@/config/database';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}

export class AuthMiddleware {
  /**
   * Middleware to authenticate requests using Clerk
   */
  static async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ResponseUtil.unauthorized(res, 'No valid authorization token provided');
        return;
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix

      try {
        // Verify the session token with Clerk
        const sessionClaims = await clerkClient.verifyToken(token);
        
        if (!sessionClaims || !sessionClaims.sub) {
          ResponseUtil.unauthorized(res, 'Invalid token');
          return;
        }

        // Get user from Clerk
        const clerkUser = await clerkClient.users.getUser(sessionClaims.sub);
        
        if (!clerkUser) {
          ResponseUtil.unauthorized(res, 'User not found');
          return;
        }

        // Get or create user in our database
        let dbUser = await prisma.user.findUnique({
          where: { clerkId: clerkUser.id }
        });

        if (!dbUser) {
          // Create user if doesn't exist
          dbUser = await prisma.user.create({
            data: {
              clerkId: clerkUser.id,
              email: clerkUser.emailAddresses[0]?.emailAddress || '',
              ownerName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null,
              image: clerkUser.imageUrl || null,
            }
          });
          
          Logger.info('Created new user from Clerk', { userId: dbUser.id, clerkId: clerkUser.id });
        }

        // Attach user to request
        req.user = {
          id: dbUser.id,
          clerkId: dbUser.clerkId,
          email: dbUser.email,
          ownerName: dbUser.ownerName || undefined,
          isOnboarded: dbUser.isOnboarded,
        };

        next();
      } catch (clerkError) {
        Logger.error('Clerk token verification failed', clerkError);
        ResponseUtil.unauthorized(res, 'Invalid or expired token');
        return;
      }
    } catch (error) {
      Logger.error('Authentication middleware error', error);
      ResponseUtil.serverError(res, 'Authentication failed');
      return;
    }
  }

  /**
   * Middleware to check if user has completed onboarding
   */
  static requireOnboarding(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
      ResponseUtil.unauthorized(res, 'Authentication required');
      return;
    }

    if (!req.user.isOnboarded) {
      ResponseUtil.forbidden(res, 'Onboarding required to access this resource');
      return;
    }

    next();
  }

  /**
   * Optional authentication - doesn't fail if no token provided
   */
  static async optionalAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    // If token is provided, try to authenticate
    await AuthMiddleware.authenticate(req, res, next);
  }
}
