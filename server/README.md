# CHIDI Backend API

A feature-based Node.js/Express backend API for the CHIDI business management application, built with TypeScript, Prisma, and Clerk authentication.

## 🏗️ Architecture

This backend follows a **feature-based architecture** that mirrors the frontend structure:

```
server/
├── src/
│   ├── config/           # Configuration and database setup
│   ├── shared/           # Shared utilities, middleware, and types
│   │   ├── middleware/   # Authentication, validation, error handling
│   │   ├── types/        # Shared TypeScript types
│   │   └── utils/        # Response utilities, logging
│   └── features/         # Feature-specific modules
│       └── auth/         # User authentication and profile management
│           ├── controllers/
│           ├── services/
│           ├── types/
│           └── routes/
├── prisma/
│   └── schema.prisma     # Database schema
└── package.json
```

## 🚀 Features Implemented

### ✅ User/Auth Feature
- **User registration/login/logout** via Clerk integration
- **Profile management** with business information
- **Onboarding flow** for new users
- **Password reset** functionality
- **JWT authentication** middleware
- **Session management**
- **Account deletion**

## 🛠️ Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate limiting
- **Logging**: Custom logger with Morgan

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Clerk account and API keys

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Update `.env` with your actual values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/chidi_db"

# Clerk Authentication
CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Server
PORT=3001
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:3000"
```

### 3. Database Setup

Generate Prisma client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

For production, use migrations:

```bash
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/auth/profile` | Get current user profile | ✅ |
| `PUT` | `/api/auth/profile` | Update user profile | ✅ |
| `GET` | `/api/auth/onboarding/status` | Get onboarding status | ✅ |
| `POST` | `/api/auth/onboarding` | Complete onboarding | ✅ |
| `POST` | `/api/auth/refresh` | Refresh user session | ✅ |
| `POST` | `/api/auth/password-reset/request` | Request password reset | ❌ |
| `DELETE` | `/api/auth/account` | Delete user account | ✅ |
| `POST` | `/api/auth/webhooks/clerk` | Clerk webhook handler | ❌ |

### Request/Response Examples

#### Get User Profile
```bash
GET /api/auth/profile
Authorization: Bearer <clerk_session_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "ownerName": "John Doe",
      "businessName": "John's Store",
      "isOnboarded": true,
      // ... other profile fields
    }
  },
  "message": "Profile retrieved successfully"
}
```

#### Update Profile
```bash
PUT /api/auth/profile
Authorization: Bearer <clerk_session_token>
Content-Type: application/json

{
  "ownerName": "John Doe",
  "businessName": "John's Updated Store",
  "businessCategory": "Fashion",
  "phone": "+1234567890"
}
```

#### Complete Onboarding
```bash
POST /api/auth/onboarding
Authorization: Bearer <clerk_session_token>
Content-Type: application/json

{
  "ownerName": "John Doe",
  "businessName": "John's Store",
  "businessCategory": "Fashion",
  "businessDescription": "A modern fashion store"
}
```

## 🔒 Authentication Flow

1. **Frontend** authenticates users with Clerk
2. **Frontend** sends Clerk session token in `Authorization: Bearer <token>` header
3. **Backend** validates token with Clerk API
4. **Backend** creates/updates user in local database
5. **Backend** attaches user info to request object

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: API rate limiting (100 requests per 15 minutes)
- **Input Validation**: Zod schema validation
- **Error Handling**: Centralized error handling
- **Authentication**: Clerk-based JWT validation

## 📊 Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  
  // Personal Information
  ownerName String?
  phone     String?
  image     String?
  
  // Business Information
  businessName        String?
  businessCategory    String?
  businessDescription String?
  
  // Address Information
  address String?
  city    String?
  state   String?
  country String? @default("Nigeria")
  
  // Status
  status      UserStatus @default(ACTIVE)
  isOnboarded Boolean    @default(false)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment, especially:
- `DATABASE_URL` (production database)
- `CLERK_SECRET_KEY` (production Clerk key)
- `NODE_ENV=production`

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Adding New Features

1. Create feature directory under `src/features/`
2. Follow the established structure:
   ```
   features/new-feature/
   ├── controllers/
   ├── services/
   ├── types/
   ├── routes/
   └── index.ts
   ```
3. Add routes to main server in `src/index.ts`
4. Update database schema if needed

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify `DATABASE_URL` is correct
   - Ensure PostgreSQL is running
   - Check database permissions

2. **Clerk Authentication Error**
   - Verify Clerk API keys are correct
   - Check Clerk dashboard for webhook configuration
   - Ensure frontend is sending valid session tokens

3. **TypeScript Errors**
   - Run `npm run db:generate` after schema changes
   - Check import paths use `@/` aliases correctly

## 📝 License

This project is part of the CHIDI application suite.
