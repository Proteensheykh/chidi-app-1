import { useEffect, useState } from 'react';
import { FEATURES, FeatureName, isFeatureEnabled } from '../config/feature-flags';

/**
 * Hook for accessing feature flags in components
 * 
 * @returns Object containing:
 * - features: Current state of all feature flags
 * - isEnabled: Function to check if a specific feature is enabled
 */
export function useFeatureFlags() {
  // Initialize with server-side values
  const [features, setFeatures] = useState(FEATURES);

  // Update features if environment variables change (unlikely in production)
  useEffect(() => {
    setFeatures({
      ...FEATURES,
      // Re-evaluate any features that might change at runtime
      // Currently none, but this pattern allows for future dynamic flags
    });
  }, []);

  /**
   * Check if a specific feature is enabled
   * @param feature - The feature to check
   * @returns boolean - Whether the feature is enabled
   */
  const isEnabled = (feature: FeatureName): boolean => {
    return isFeatureEnabled(feature);
  };

  return {
    features,
    isEnabled,
  };
}
