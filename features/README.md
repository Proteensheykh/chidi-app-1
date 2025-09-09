# Features Directory

This directory contains the feature-based organization of the CHIDI app, following a domain-driven design approach.

## Feature Structure
Each feature follows this structure:
- `/components` - UI components specific to the feature
- `/queries` - Data fetching functions for the feature
- `/utils` - Utility functions specific to the feature
- `/hooks` - Custom hooks specific to the feature

## Available Features

### Products
Components for product management, including product listings, details, and inventory management.

### Customers
Components for customer management, including customer listings, profiles, and communication history.

### Orders
Components for order management, including order creation, tracking, and fulfillment.

### Chat
Components for the AI chat assistant functionality, including conversation interfaces and message handling.

### Notifications
Components for the notification system, including alerts, badges, and notification history.

### Settings
Components for application settings, including business hours, templates, and user preferences.

### Shared
Shared components, utilities, and hooks used across multiple features:
- `/ui` - Reusable UI components (buttons, cards, inputs, etc.)
- `/hooks` - Common hooks (useToast, useMobile, etc.)
- `/utils` - Utility functions (formatting, validation, etc.)

## Import Conventions
Each feature exports its components through an index.ts file for cleaner imports:

```typescript
// Good
import { ProductsTab } from "@/features/products/components"

// Instead of
import { ProductsTab } from "@/features/products/components/products-tab"
```
