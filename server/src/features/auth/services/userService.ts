import { prisma } from '@/config/database';
import { Logger } from '@/shared/utils';
import { UserProfile, UpdateProfileRequest, OnboardingRequest } from '../types';
import { UserStatus } from '@/shared/types';

export class UserService {
  /**
   * Get user profile by ID
   */
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return null;
      }

      return this.mapToUserProfile(user);
    } catch (error) {
      Logger.error('Error fetching user profile', error);
      throw new Error('Failed to fetch user profile');
    }
  }

  /**
   * Get user profile by Clerk ID
   */
  static async getUserByClerkId(clerkId: string): Promise<UserProfile | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId }
      });

      if (!user) {
        return null;
      }

      return this.mapToUserProfile(user);
    } catch (error) {
      Logger.error('Error fetching user by Clerk ID', error);
      throw new Error('Failed to fetch user');
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, data: UpdateProfileRequest): Promise<UserProfile> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...data,
          updatedAt: new Date(),
        }
      });

      Logger.info('User profile updated', { userId });
      return this.mapToUserProfile(updatedUser);
    } catch (error) {
      Logger.error('Error updating user profile', error);
      throw new Error('Failed to update profile');
    }
  }

  /**
   * Complete user onboarding
   */
  static async completeOnboarding(userId: string, data: OnboardingRequest): Promise<UserProfile> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...data,
          isOnboarded: true,
          status: UserStatus.ACTIVE,
          updatedAt: new Date(),
        }
      });

      Logger.info('User onboarding completed', { userId });
      return this.mapToUserProfile(updatedUser);
    } catch (error) {
      Logger.error('Error completing onboarding', error);
      throw new Error('Failed to complete onboarding');
    }
  }

  /**
   * Update user status
   */
  static async updateUserStatus(userId: string, status: UserStatus): Promise<UserProfile> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          status,
          updatedAt: new Date(),
        }
      });

      Logger.info('User status updated', { userId, status });
      return this.mapToUserProfile(updatedUser);
    } catch (error) {
      Logger.error('Error updating user status', error);
      throw new Error('Failed to update user status');
    }
  }

  /**
   * Delete user account
   */
  static async deleteUser(userId: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id: userId }
      });

      Logger.info('User account deleted', { userId });
    } catch (error) {
      Logger.error('Error deleting user account', error);
      throw new Error('Failed to delete user account');
    }
  }

  /**
   * Check if user exists by email
   */
  static async userExistsByEmail(email: string): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      return !!user;
    } catch (error) {
      Logger.error('Error checking user existence', error);
      return false;
    }
  }

  /**
   * Map database user to UserProfile
   */
  static mapToUserProfile(user: any): UserProfile {
    return {
      id: user.id,
      clerkId: user.clerkId,
      email: user.email,
      ownerName: user.ownerName,
      phone: user.phone,
      image: user.image,
      businessName: user.businessName,
      businessCategory: user.businessCategory,
      businessDescription: user.businessDescription,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      status: user.status,
      isOnboarded: user.isOnboarded,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
