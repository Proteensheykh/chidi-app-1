/**
 * Feature Flag System
 * 
 * This file defines the feature flags for the CHIDI application.
 * Features can be enabled/disabled via environment variables.
 * 
 * To enable a feature in development, add it to your .env.local file:
 * NEXT_PUBLIC_FEATURE_SALES=true
 * 
 * For production, configure these in your hosting environment.
 */

// Helper function to parse boolean environment variables
const parseBooleanEnv = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

// Feature flag definitions
export const FEATURES = {
  // Core features - always enabled
  HOME: true,
  CATALOG: true,
  CHAT: true,
  SETTINGS: true,
  
  // V2 features - can be toggled
  SALES: parseBooleanEnv(process.env.NEXT_PUBLIC_FEATURE_SALES, false),
  CUSTOMERS: parseBooleanEnv(process.env.NEXT_PUBLIC_FEATURE_CUSTOMERS, false),
  ORDERS: parseBooleanEnv(process.env.NEXT_PUBLIC_FEATURE_ORDERS, false),
};

// Type for feature names
export type FeatureName = keyof typeof FEATURES;

/**
 * Check if a feature is enabled
 * @param feature - The feature to check
 * @returns boolean - Whether the feature is enabled
 */
export const isFeatureEnabled = (feature: FeatureName): boolean => {
  return FEATURES[feature];
};
