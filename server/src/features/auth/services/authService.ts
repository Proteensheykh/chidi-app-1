import { clerkClient } from '@clerk/clerk-sdk-node';
import { prisma } from '@/config/database';
import { Logger } from '@/shared/utils';
import { UserProfile } from '../types';
import { UserService } from './userService';

export class AuthService {
  /**
   * Handle user registration via Clerk webhook
   */
  static async handleUserRegistration(clerkUser: any): Promise<UserProfile> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: clerkUser.id }
      });

      if (existingUser) {
        Logger.info('User already exists', { clerkId: clerkUser.id });
        return UserService.mapToUserProfile(existingUser);
      }

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.email_addresses[0]?.email_address || '',
          ownerName: `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim() || null,
          image: clerkUser.image_url || null,
        }
      });

      Logger.info('New user created from Clerk', { userId: newUser.id, clerkId: clerkUser.id });
      return UserService.mapToUserProfile(newUser);
    } catch (error) {
      Logger.error('Error handling user registration', error);
      throw new Error('Failed to register user');
    }
  }

  /**
   * Handle user update via Clerk webhook
   */
  static async handleUserUpdate(clerkUser: any): Promise<UserProfile | null> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: clerkUser.id }
      });

      if (!existingUser) {
        Logger.warn('User not found for update', { clerkId: clerkUser.id });
        return null;
      }

      const updatedUser = await prisma.user.update({
        where: { clerkId: clerkUser.id },
        data: {
          email: clerkUser.email_addresses[0]?.email_address || existingUser.email,
          ownerName: `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim() || existingUser.ownerName,
          image: clerkUser.image_url || existingUser.image,
          updatedAt: new Date(),
        }
      });

      Logger.info('User updated from Clerk', { userId: updatedUser.id, clerkId: clerkUser.id });
      return UserService.mapToUserProfile(updatedUser);
    } catch (error) {
      Logger.error('Error handling user update', error);
      throw new Error('Failed to update user');
    }
  }

  /**
   * Handle user deletion via Clerk webhook
   */
  static async handleUserDeletion(clerkId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId }
      });

      if (!user) {
        Logger.warn('User not found for deletion', { clerkId });
        return;
      }

      await prisma.user.delete({
        where: { clerkId }
      });

      Logger.info('User deleted from Clerk webhook', { userId: user.id, clerkId });
    } catch (error) {
      Logger.error('Error handling user deletion', error);
      throw new Error('Failed to delete user');
    }
  }

  /**
   * Validate user session with Clerk
   */
  static async validateSession(sessionToken: string): Promise<any> {
    try {
      const sessionClaims = await clerkClient.verifyToken(sessionToken);
      return sessionClaims;
    } catch (error) {
      Logger.error('Session validation failed', error);
      throw new Error('Invalid session');
    }
  }

  /**
   * Get user from Clerk by ID
   */
  static async getClerkUser(clerkId: string): Promise<any> {
    try {
      const clerkUser = await clerkClient.users.getUser(clerkId);
      return clerkUser;
    } catch (error) {
      Logger.error('Error fetching Clerk user', error);
      throw new Error('Failed to fetch user from Clerk');
    }
  }

  /**
   * Request password reset via Clerk
   */
  static async requestPasswordReset(email: string): Promise<void> {
    try {
      // Clerk handles password reset emails automatically
      // We just need to verify the user exists
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        // Don't reveal if user exists or not for security
        Logger.info('Password reset requested for non-existent user', { email });
        return;
      }

      Logger.info('Password reset requested', { userId: user.id, email });
    } catch (error) {
      Logger.error('Error requesting password reset', error);
      throw new Error('Failed to request password reset');
    }
  }
}
