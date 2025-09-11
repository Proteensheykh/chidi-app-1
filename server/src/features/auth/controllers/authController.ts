import { Request, Response } from 'express';
import { ResponseUtil, Logger } from '@/shared/utils';
import { AuthService, UserService } from '../services';
import { 
  UpdateProfileRequest, 
  OnboardingRequest, 
  PasswordResetRequestBody,
  AuthResponse,
  OnboardingResponse 
} from '../types';

export class AuthController {
  /**
   * Get current user profile
   * GET /api/auth/profile
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res, 'Authentication required');
        return;
      }

      const userProfile = await UserService.getUserProfile(req.user.id);
      
      if (!userProfile) {
        ResponseUtil.notFound(res, 'User profile not found');
        return;
      }

      const response: AuthResponse = {
        user: userProfile
      };

      ResponseUtil.success(res, response, 'Profile retrieved successfully');
    } catch (error) {
      Logger.error('Error getting user profile', error);
      ResponseUtil.serverError(res, 'Failed to retrieve profile');
    }
  }

  /**
   * Update user profile
   * PUT /api/auth/profile
   */
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res, 'Authentication required');
        return;
      }

      const updateData: UpdateProfileRequest = req.body;
      const updatedProfile = await UserService.updateProfile(req.user.id, updateData);

      const response: AuthResponse = {
        user: updatedProfile
      };

      ResponseUtil.success(res, response, 'Profile updated successfully');
    } catch (error) {
      Logger.error('Error updating user profile', error);
      ResponseUtil.serverError(res, 'Failed to update profile');
    }
  }

  /**
   * Complete user onboarding
   * POST /api/auth/onboarding
   */
  static async completeOnboarding(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res, 'Authentication required');
        return;
      }

      if (req.user.isOnboarded) {
        ResponseUtil.error(res, 'User has already completed onboarding', 400);
        return;
      }

      const onboardingData: OnboardingRequest = req.body;
      const updatedProfile = await UserService.completeOnboarding(req.user.id, onboardingData);

      const response: OnboardingResponse = {
        user: updatedProfile,
        message: 'Onboarding completed successfully'
      };

      ResponseUtil.success(res, response, 'Onboarding completed successfully', 201);
    } catch (error) {
      Logger.error('Error completing onboarding', error);
      ResponseUtil.serverError(res, 'Failed to complete onboarding');
    }
  }

  /**
   * Get onboarding status
   * GET /api/auth/onboarding/status
   */
  static async getOnboardingStatus(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res, 'Authentication required');
        return;
      }

      const userProfile = await UserService.getUserProfile(req.user.id);
      
      if (!userProfile) {
        ResponseUtil.notFound(res, 'User profile not found');
        return;
      }

      ResponseUtil.success(res, {
        isOnboarded: userProfile.isOnboarded,
        hasBasicInfo: !!(userProfile.ownerName && userProfile.businessName),
        hasBusinessInfo: !!(userProfile.businessName && userProfile.businessCategory),
        profile: userProfile
      }, 'Onboarding status retrieved');
    } catch (error) {
      Logger.error('Error getting onboarding status', error);
      ResponseUtil.serverError(res, 'Failed to retrieve onboarding status');
    }
  }

  /**
   * Request password reset
   * POST /api/auth/password-reset/request
   */
  static async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email }: PasswordResetRequestBody = req.body;
      
      await AuthService.requestPasswordReset(email);
      
      // Always return success to prevent email enumeration
      ResponseUtil.success(res, null, 'If an account with that email exists, a password reset link has been sent');
    } catch (error) {
      Logger.error('Error requesting password reset', error);
      ResponseUtil.serverError(res, 'Failed to process password reset request');
    }
  }

  /**
   * Delete user account
   * DELETE /api/auth/account
   */
  static async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res, 'Authentication required');
        return;
      }

      await UserService.deleteUser(req.user.id);
      
      ResponseUtil.success(res, null, 'Account deleted successfully');
    } catch (error) {
      Logger.error('Error deleting user account', error);
      ResponseUtil.serverError(res, 'Failed to delete account');
    }
  }

  /**
   * Handle Clerk webhooks
   * POST /api/auth/webhooks/clerk
   */
  static async handleClerkWebhook(req: Request, res: Response): Promise<void> {
    try {
      const { type, data } = req.body;

      switch (type) {
        case 'user.created':
          await AuthService.handleUserRegistration(data);
          break;
        
        case 'user.updated':
          await AuthService.handleUserUpdate(data);
          break;
        
        case 'user.deleted':
          await AuthService.handleUserDeletion(data.id);
          break;
        
        default:
          Logger.warn('Unhandled Clerk webhook type', { type });
      }

      ResponseUtil.success(res, null, 'Webhook processed successfully');
    } catch (error) {
      Logger.error('Error processing Clerk webhook', error);
      ResponseUtil.serverError(res, 'Failed to process webhook');
    }
  }

  /**
   * Refresh user session
   * POST /api/auth/refresh
   */
  static async refreshSession(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res, 'Authentication required');
        return;
      }

      const userProfile = await UserService.getUserProfile(req.user.id);
      
      if (!userProfile) {
        ResponseUtil.notFound(res, 'User profile not found');
        return;
      }

      const response: AuthResponse = {
        user: userProfile
      };

      ResponseUtil.success(res, response, 'Session refreshed successfully');
    } catch (error) {
      Logger.error('Error refreshing session', error);
      ResponseUtil.serverError(res, 'Failed to refresh session');
    }
  }
}
