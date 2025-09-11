# CHIDI Backend API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <clerk_session_token>
```

## Response Format
All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "data": {}, // Response data
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": { // Optional validation errors
    "field": ["Error message"]
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [], // Array of items
  "message": "Success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Authentication Endpoints

### Get User Profile
Get the current authenticated user's profile information.

**Endpoint:** `GET /auth/profile`  
**Authentication:** Required  

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_2abc123def456",
      "clerkId": "user_2abc123def456",
      "email": "john@example.com",
      "ownerName": "John Doe",
      "phone": "+1234567890",
      "image": "https://example.com/avatar.jpg",
      "businessName": "John's Fashion Store",
      "businessCategory": "Fashion",
      "businessDescription": "A modern fashion retail store",
      "address": "123 Main Street",
      "city": "Lagos",
      "state": "Lagos",
      "country": "Nigeria",
      "status": "ACTIVE",
      "isOnboarded": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Profile retrieved successfully"
}
```

### Update User Profile
Update the current user's profile information.

**Endpoint:** `PUT /auth/profile`  
**Authentication:** Required  

**Request Body:**
```json
{
  "ownerName": "John Doe",
  "phone": "+1234567890",
  "businessName": "John's Updated Store",
  "businessCategory": "Fashion & Accessories",
  "businessDescription": "Premium fashion and accessories store",
  "address": "456 New Street",
  "city": "Lagos",
  "state": "Lagos",
  "country": "Nigeria"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      // Updated user object
    }
  },
  "message": "Profile updated successfully"
}
```

### Get Onboarding Status
Check the current user's onboarding completion status.

**Endpoint:** `GET /auth/onboarding/status`  
**Authentication:** Required  

**Response:**
```json
{
  "success": true,
  "data": {
    "isOnboarded": false,
    "hasBasicInfo": true,
    "hasBusinessInfo": false,
    "profile": {
      // User profile object
    }
  },
  "message": "Onboarding status retrieved"
}
```

### Complete Onboarding
Complete the user onboarding process with required business information.

**Endpoint:** `POST /auth/onboarding`  
**Authentication:** Required  

**Request Body:**
```json
{
  "ownerName": "John Doe",
  "businessName": "John's Fashion Store",
  "businessCategory": "Fashion",
  "businessDescription": "A modern fashion retail store",
  "phone": "+1234567890",
  "address": "123 Main Street",
  "city": "Lagos",
  "state": "Lagos"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      // Updated user object with isOnboarded: true
    },
    "message": "Onboarding completed successfully"
  },
  "message": "Onboarding completed successfully"
}
```

### Refresh Session
Refresh the current user session and get updated profile information.

**Endpoint:** `POST /auth/refresh`  
**Authentication:** Required  

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      // Current user object
    }
  },
  "message": "Session refreshed successfully"
}
```

### Request Password Reset
Request a password reset email for the given email address.

**Endpoint:** `POST /auth/password-reset/request`  
**Authentication:** Not Required  

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "If an account with that email exists, a password reset link has been sent"
}
```

### Delete Account
Permanently delete the current user's account.

**Endpoint:** `DELETE /auth/account`  
**Authentication:** Required  

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Account deleted successfully"
}
```

### Clerk Webhook Handler
Handle webhooks from Clerk for user lifecycle events.

**Endpoint:** `POST /auth/webhooks/clerk`  
**Authentication:** Webhook Secret Verification  

**Supported Events:**
- `user.created` - New user registration
- `user.updated` - User profile update
- `user.deleted` - User account deletion

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Authentication endpoints**: 10 requests per 15 minutes
- **Sensitive endpoints**: 5 requests per 15 minutes

## Validation Rules

### User Profile Fields
- `ownerName`: Required, 1-100 characters
- `email`: Required, valid email format
- `phone`: Optional, valid international phone number
- `businessName`: Optional, 1-100 characters
- `businessCategory`: Optional, 1-50 characters
- `businessDescription`: Optional, max 500 characters
- `address`: Optional, max 200 characters
- `city`: Optional, max 50 characters
- `state`: Optional, max 50 characters
- `country`: Optional, max 50 characters

### Onboarding Requirements
- `ownerName`: Required
- `businessName`: Required
- `businessCategory`: Required
- Other fields are optional

## Example Usage

### cURL Examples

#### Get Profile
```bash
curl -X GET \
  http://localhost:3001/api/auth/profile \
  -H 'Authorization: Bearer your_clerk_session_token'
```

#### Update Profile
```bash
curl -X PUT \
  http://localhost:3001/api/auth/profile \
  -H 'Authorization: Bearer your_clerk_session_token' \
  -H 'Content-Type: application/json' \
  -d '{
    "ownerName": "John Doe",
    "businessName": "John'\''s Store",
    "businessCategory": "Fashion"
  }'
```

#### Complete Onboarding
```bash
curl -X POST \
  http://localhost:3001/api/auth/onboarding \
  -H 'Authorization: Bearer your_clerk_session_token' \
  -H 'Content-Type: application/json' \
  -d '{
    "ownerName": "John Doe",
    "businessName": "John'\''s Fashion Store",
    "businessCategory": "Fashion",
    "businessDescription": "A modern fashion store"
  }'
```

### JavaScript/Fetch Examples

#### Get Profile
```javascript
const response = await fetch('http://localhost:3001/api/auth/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${clerkSessionToken}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.data.user);
```

#### Update Profile
```javascript
const response = await fetch('http://localhost:3001/api/auth/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${clerkSessionToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ownerName: 'John Doe',
    businessName: 'John\'s Updated Store',
    businessCategory: 'Fashion & Accessories'
  })
});

const data = await response.json();
if (data.success) {
  console.log('Profile updated:', data.data.user);
} else {
  console.error('Error:', data.error);
}
```
