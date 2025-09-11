# CHIDI App Feature Flag System

This document explains how to use the feature flag system implemented for the CHIDI app.

## Overview

The feature flag system allows for conditionally enabling or disabling certain features of the application. This is particularly useful for:

- Shelving features that are not ready for production
- A/B testing different features
- Gradually rolling out features to users
- Maintaining different feature sets for different environments

## Shelved Features

The following features have been shelved for v2:

- **Sales**: Sales dashboard and revenue tracking
- **Customers**: Customer management and details
- **Orders**: Order processing and management

## How to Enable/Disable Features

Features can be enabled or disabled via environment variables:

### Development Environment

Create a `.env.local` file in the root of your project with the following content:

```
# Feature Flags
NEXT_PUBLIC_FEATURE_SALES=false
NEXT_PUBLIC_FEATURE_CUSTOMERS=false
NEXT_PUBLIC_FEATURE_ORDERS=false
```

Set any of these values to `true` to enable the corresponding feature.

### Production Environment

Configure these environment variables in your hosting provider's settings.

## Implementation Details

The feature flag system consists of:

1. **Configuration**: `features/shared/config/feature-flags.ts` - Defines available features and their default states
2. **Hook**: `features/shared/hooks/use-feature-flags.ts` - React hook for accessing feature flags in components
3. **Types**: `features/shared/types/shelved-types.ts` - Type definitions for shelved features

## Usage in Components

To conditionally render a component based on a feature flag:

```tsx
import { useFeatureFlags } from "@/features/shared/hooks/use-feature-flags";

function MyComponent() {
  const { isEnabled } = useFeatureFlags();
  
  return (
    <div>
      {/* Always shown */}
      <h1>CHIDI App</h1>
      
      {/* Conditionally shown */}
      {isEnabled('SALES') && <SalesComponent />}
    </div>
  );
}
```

## Adding New Feature Flags

To add a new feature flag:

1. Add the feature to the `FEATURES` object in `features/shared/config/feature-flags.ts`
2. Add the corresponding environment variable
3. Use the `isEnabled` function to conditionally render components

## Best Practices

- Always provide a fallback experience when a feature is disabled
- Add TODO comments to shelved feature components indicating they are for v2
- Keep the feature flag system simple and focused on major features
- Document any changes to the feature flag system
