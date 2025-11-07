# FoodChain - Role-Based Authentication System

## 🎯 Project Overview

A complete Next.js 15 food donation platform with custom JWT-based authentication, role-based access control, and AWS DynamoDB integration. Users can register as either **Donors** (who create food donations) or **Receivers** (who view and claim donations).

## ✨ Key Features Implemented

### 1. Authentication System
- ✅ Custom JWT-based authentication (no third-party auth services)
- ✅ Secure password hashing with bcrypt (10 salt rounds)
- ✅ Token expiration (1 hour)
- ✅ LocalStorage token persistence
- ✅ Automatic token validation on protected routes

### 2. Role-Based Access Control
- ✅ Two user roles: `donor` and `receiver`
- ✅ Role-specific dashboards
- ✅ Protected API endpoints with role verification
- ✅ Automatic redirection based on user role

### 3. AWS DynamoDB Integration
- ✅ User data stored in DynamoDB
- ✅ Email as partition key
- ✅ Secure credential management via environment variables
- ✅ AWS SDK v3 implementation

### 4. API Routes
- ✅ `POST /api/signup` - User registration
- ✅ `POST /api/login` - User authentication
- ✅ `POST /api/donations/create` - Create donation (donor only)
- ✅ `GET /api/donations/list` - List donations (receiver only)

### 5. Frontend Components
- ✅ LoginForm - Combined login/signup interface
- ✅ CreateDonationForm - Donation creation (donor)
- ✅ DonationList - View donations (receiver)
- ✅ Role-specific dashboards
- ✅ Responsive design with TailwindCSS

## 📁 Project Structure

```
d:/sem5/projects/AWS/final/
├── app/
│   ├── api/
│   │   ├── signup/route.ts           # User registration endpoint
│   │   ├── login/route.ts            # User login endpoint
│   │   └── donations/
│   │       ├── create/route.ts       # Create donation (donor only)
│   │       └── list/route.ts         # List donations (receiver only)
│   ├── context/
│   │   └── AuthContext.tsx           # React Context for auth state
│   ├── components/
│   │   └── LoginForm.tsx             # Login/Signup UI
│   ├── donor-dashboard/
│   │   └── page.tsx                  # Donor dashboard
│   ├── receiver-dashboard/
│   │   └── page.tsx                  # Receiver dashboard
│   ├── page.tsx                      # Landing page with auth redirect
│   └── layout.tsx                    # Root layout with AuthProvider
├── components/
│   ├── createDonation.jsx            # Create donation form
│   └── DonationList.jsx              # List donations component
├── lib/
│   ├── dynamodb.ts                   # DynamoDB client setup
│   ├── jwt.ts                        # JWT utilities
│   └── middleware.ts                 # Auth middleware
├── scripts/
│   └── create-dynamodb-table.js      # Helper script for table creation
├── env.example                       # Environment variables template
├── SETUP.md                          # Detailed setup guide
├── QUICK_START.md                    # Quick start guide
└── PROJECT_SUMMARY.md                # This file
```

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 15.5.5 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: TailwindCSS 4.1.14
- **HTTP Client**: Axios 1.12.2

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes (Server-side)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt

### Database
- **Service**: AWS DynamoDB
- **SDK**: @aws-sdk/client-dynamodb v3
- **Region**: ap-south-1 (Asia Pacific - Mumbai)

## 🔐 Security Implementation

### Password Security
```typescript
// Hashing on signup
const passwordHash = await bcrypt.hash(password, 10);

// Verification on login
const isValid = await bcrypt.compare(password, user.passwordHash);
```

### JWT Token Generation
```typescript
// Token payload
{ email: string, role: 'donor' | 'receiver' }

// Token expiration: 1 hour
jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
```

### Protected Routes
```typescript
// Middleware checks:
1. Token presence in Authorization header
2. Token validity and expiration
3. User role matches allowed roles
4. Attaches user info to request
```

## 📊 DynamoDB Schema

### Users Table
```
Table Name: Users
Partition Key: email (String)

Attributes:
- email: string (Primary Key)
- name: string
- passwordHash: string
- role: 'donor' | 'receiver'
- createdAt: ISO timestamp
```

## 🔄 Authentication Flow

```
1. User Registration/Login
   ↓
2. Backend validates credentials
   ↓
3. DynamoDB stores/retrieves user
   ↓
4. JWT token generated
   ↓
5. Token + user info returned to client
   ↓
6. Client stores in localStorage
   ↓
7. Redirect to role-specific dashboard
```

## 🚀 API Endpoints

### Public Endpoints

#### POST /api/signup
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor"
}

Response:
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "john@example.com",
    "name": "John Doe",
    "role": "donor"
  }
}
```

#### POST /api/login
```json
Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "john@example.com",
    "name": "John Doe",
    "role": "donor"
  }
}
```

### Protected Endpoints

#### POST /api/donations/create (Donor Only)
```
Headers: Authorization: Bearer <token>

Request:
{
  "donorName": "John Doe",
  "foodType": "Vegetables",
  "quantity": "5 kg"
}
```

#### GET /api/donations/list (Receiver Only)
```
Headers: Authorization: Bearer <token>

Response: Array of donations
```

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Tailwind utility classes
- Stone color palette for professional look
- Smooth transitions and hover effects

### User Experience
- Loading states with spinners
- Error messages with clear feedback
- Form validation
- Auto-redirect based on role
- Persistent login state

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Clear error messages

## 📝 Environment Variables

Required in `.env.local`:
```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=<your_key>
AWS_SECRET_ACCESS_KEY=<your_secret>
DYNAMO_DB_TABLE=Users
JWT_SECRET=<random_secret>
```

## 🧪 Testing Checklist

- [x] User can sign up as donor
- [x] User can sign up as receiver
- [x] User can log in with correct credentials
- [x] Login fails with incorrect credentials
- [x] Donor can access donor dashboard
- [x] Receiver can access receiver dashboard
- [x] Donor cannot access receiver dashboard
- [x] Receiver cannot access donor dashboard
- [x] Donor can create donations
- [x] Receiver can view donations
- [x] Token expires after 1 hour
- [x] Logout clears authentication state

## 🔮 Future Enhancements

### Potential Improvements
1. **Email Verification**: Send verification emails on signup
2. **Password Reset**: Forgot password functionality
3. **Refresh Tokens**: Implement refresh token mechanism
4. **Profile Management**: Allow users to update their profiles
5. **Donation History**: Track user's donation history
6. **Real-time Updates**: WebSocket for live donation updates
7. **Image Upload**: Add photos to donations
8. **Location-based**: Filter donations by location
9. **Rating System**: Rate donors/receivers
10. **Admin Dashboard**: Manage users and donations

### Security Enhancements
1. Rate limiting on auth endpoints
2. CAPTCHA for signup/login
3. Two-factor authentication
4. Session management
5. IP-based access control
6. Audit logging

## 📚 Documentation Files

1. **SETUP.md** - Comprehensive setup guide with troubleshooting
2. **QUICK_START.md** - 5-minute quick start guide
3. **PROJECT_SUMMARY.md** - This file, complete project overview
4. **env.example** - Environment variables template

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Custom authentication implementation
- ✅ JWT token management
- ✅ Role-based access control
- ✅ AWS DynamoDB integration
- ✅ Next.js 15 App Router
- ✅ React Context API
- ✅ TypeScript in Next.js
- ✅ Secure password handling
- ✅ RESTful API design
- ✅ Protected route implementation

## 📞 Support

For issues or questions:
1. Check SETUP.md for detailed instructions
2. Review error messages in browser console
3. Verify environment variables are correct
4. Check AWS CloudWatch logs for backend errors
5. Ensure DynamoDB table exists and is accessible

## 📄 License

Educational project for learning purposes.

---

**Built with ❤️ using Next.js, AWS DynamoDB, and JWT**
