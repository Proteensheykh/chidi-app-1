import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AuthMiddleware, ValidationMiddleware } from '@/shared/middleware';
import { 
  updateProfileSchema, 
  onboardingSchema, 
  passwordResetRequestSchema 
} from '../types';

const router = Router();

// Public routes (no authentication required)
router.post(
  '/webhooks/clerk',
  AuthController.handleClerkWebhook
);

router.post(
  '/password-reset/request',
  ValidationMiddleware.validateBody(passwordResetRequestSchema),
  AuthController.requestPasswordReset
);

// Protected routes (authentication required)
router.use(AuthMiddleware.authenticate);

// Profile management
router.get('/profile', AuthController.getProfile);
router.put(
  '/profile',
  ValidationMiddleware.validateBody(updateProfileSchema),
  AuthController.updateProfile
);

// Onboarding
router.get('/onboarding/status', AuthController.getOnboardingStatus);
router.post(
  '/onboarding',
  ValidationMiddleware.validateBody(onboardingSchema),
  AuthController.completeOnboarding
);

// Session management
router.post('/refresh', AuthController.refreshSession);

// Account management
router.delete('/account', AuthController.deleteAccount);

export { router as authRoutes };
