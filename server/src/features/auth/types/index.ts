import { z } from 'zod';

// User Profile Types
export interface UserProfile {
  id: string;
  clerkId: string;
  email: string;
  ownerName?: string;
  phone?: string;
  image?: string;
  businessName?: string;
  businessCategory?: string;
  businessDescription?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  status: string;
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Validation Schemas
export const updateProfileSchema = z.object({
  ownerName: z.string().min(1, 'Full name is required').max(100),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  businessCategory: z.string().optional(),
  businessDescription: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const onboardingSchema = z.object({
  ownerName: z.string().min(1, 'Full name is required').max(100),
  businessName: z.string().min(1, 'Business name is required').max(100),
  businessCategory: z.string().min(1, 'Business category is required').max(50),
  businessDescription: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email('Valid email is required'),
});

export const passwordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Request/Response Types
export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;
export type OnboardingRequest = z.infer<typeof onboardingSchema>;
export type PasswordResetRequestBody = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetBody = z.infer<typeof passwordResetSchema>;

export interface AuthResponse {
  user: UserProfile;
  token?: string;
}

export interface OnboardingResponse {
  user: UserProfile;
  message: string;
}
