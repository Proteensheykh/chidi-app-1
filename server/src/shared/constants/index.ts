export const API_ROUTES = {
  AUTH: '/api/auth',
  HEALTH: '/health',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  VALIDATION_FAILED: 'Validation failed',
  INTERNAL_ERROR: 'Internal server error',
  USER_NOT_FOUND: 'User not found',
  INVALID_TOKEN: 'Invalid or expired token',
  ONBOARDING_REQUIRED: 'Onboarding required to access this resource',
  ALREADY_ONBOARDED: 'User has already completed onboarding',
} as const;

export const SUCCESS_MESSAGES = {
  PROFILE_RETRIEVED: 'Profile retrieved successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  ONBOARDING_COMPLETED: 'Onboarding completed successfully',
  SESSION_REFRESHED: 'Session refreshed successfully',
  ACCOUNT_DELETED: 'Account deleted successfully',
  PASSWORD_RESET_SENT: 'If an account with that email exists, a password reset link has been sent',
  WEBHOOK_PROCESSED: 'Webhook processed successfully',
} as const;
