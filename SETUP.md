# FoodChain - Role-Based Authentication Setup Guide

## Overview
This guide will help you set up the FoodChain application with role-based authentication using AWS DynamoDB, JWT tokens, and Next.js.

## Prerequisites
- Node.js 18+ installed
- AWS Account with DynamoDB access
- AWS Access Key ID and Secret Access Key

## Step 1: DynamoDB Table Setup

### Create Users Table in AWS Console

1. Go to AWS DynamoDB Console (https://console.aws.amazon.com/dynamodb)
2. Click "Create table"
3. Configure the table:
   - **Table name**: `Users`
   - **Partition key**: `email` (String)
   - **Table settings**: Use default settings or customize as needed
4. Click "Create table"

### Alternative: Create Table Using AWS CLI

```bash
aws dynamodb create-table \
    --table-name Users \
    --attribute-definitions AttributeName=email,AttributeType=S \
    --key-schema AttributeName=email,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region ap-south-1
```

## Step 2: Environment Configuration

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and add your AWS credentials:
   ```env
   # AWS Configuration
   AWS_REGION=ap-south-1
   AWS_ACCESS_KEY_ID=your_actual_access_key_here
   AWS_SECRET_ACCESS_KEY=your_actual_secret_key_here
   DYNAMO_DB_TABLE=Users

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ```

   **Important**: 
   - Replace `your_actual_access_key_here` with your AWS Access Key ID
   - Replace `your_actual_secret_key_here` with your AWS Secret Access Key
   - Generate a strong JWT secret (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

## Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT token generation and verification
- `@aws-sdk/client-dynamodb` - AWS DynamoDB client
- `@aws-sdk/lib-dynamodb` - DynamoDB document client

## Step 4: Run the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Application Structure

```
/app
  /api
    /signup/route.ts          # User registration endpoint
    /login/route.ts           # User login endpoint
    /donations
      /create/route.ts        # Create donation (donor only)
      /list/route.ts          # List donations (receiver only)
  /context
    AuthContext.tsx           # Authentication context provider
  /components
    LoginForm.tsx             # Login/Signup UI component
  /donor-dashboard
    page.tsx                  # Donor dashboard page
  /receiver-dashboard
    page.tsx                  # Receiver dashboard page
  page.tsx                    # Main landing page
  layout.tsx                  # Root layout with AuthProvider

/components
  createDonation.jsx          # Create donation form
  DonationList.jsx            # List donations component

/lib
  dynamodb.ts                 # DynamoDB client configuration
  jwt.ts                      # JWT utilities
  middleware.ts               # JWT authentication middleware
```

## User Roles

### Donor
- Can create food donations
- Access to `/donor-dashboard`
- Can use `/api/donations/create` endpoint

### Receiver
- Can view and claim available donations
- Access to `/receiver-dashboard`
- Can use `/api/donations/list` endpoint

## API Endpoints

### Public Endpoints

#### POST /api/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "donor"
}
```

**Response:**
```json
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
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
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

All protected endpoints require an `Authorization` header with a Bearer token:
```
Authorization: Bearer <your_jwt_token>
```

#### POST /api/donations/create (Donor Only)
Create a new donation.

**Request Body:**
```json
{
  "donorName": "John Doe",
  "foodType": "Vegetables",
  "quantity": "5 kg"
}
```

#### GET /api/donations/list (Receiver Only)
List all available donations.

**Response:**
```json
[
  {
    "donationId": "123",
    "donorName": "John Doe",
    "foodType": "Vegetables",
    "quantity": "5 kg",
    "status": "pending"
  }
]
```

## Authentication Flow

1. **User Registration/Login**
   - User submits credentials via LoginForm
   - Backend validates and creates/verifies user in DynamoDB
   - JWT token is generated and returned
   - Token and user info stored in localStorage

2. **Authenticated Requests**
   - Frontend includes JWT token in Authorization header
   - Backend middleware verifies token
   - User role is checked for protected routes
   - Request is processed or rejected based on permissions

3. **Role-Based Routing**
   - After login, users are redirected based on role:
     - Donors → `/donor-dashboard`
     - Receivers → `/receiver-dashboard`
   - Unauthorized access attempts are redirected

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with 10 salt rounds
- **JWT Tokens**: Tokens expire after 1 hour
- **Role-Based Access Control**: API endpoints verify user roles
- **Environment Variables**: Sensitive data stored in `.env.local`
- **HTTPS**: Use HTTPS in production for secure token transmission

## Troubleshooting

### DynamoDB Connection Issues
- Verify AWS credentials are correct in `.env.local`
- Check IAM permissions for DynamoDB access
- Ensure the Users table exists in the correct region

### JWT Token Errors
- Verify JWT_SECRET is set in `.env.local`
- Check token expiration (tokens expire after 1 hour)
- Clear localStorage and login again

### Role Access Denied
- Verify user role is correctly set during signup
- Check that the correct role is stored in DynamoDB
- Ensure middleware is checking the correct role

## Production Deployment

1. **Environment Variables**: Set all environment variables in your hosting platform
2. **HTTPS**: Ensure your application uses HTTPS
3. **JWT Secret**: Use a strong, randomly generated secret
4. **AWS Credentials**: Use IAM roles instead of access keys when possible
5. **CORS**: Configure CORS settings for your API routes
6. **Rate Limiting**: Implement rate limiting for authentication endpoints

## Testing

### Test User Creation
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Donor",
    "email": "donor@test.com",
    "password": "password123",
    "role": "donor"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "donor@test.com",
    "password": "password123"
  }'
```

### Test Protected Endpoint
```bash
curl -X POST http://localhost:3000/api/donations/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "donorName": "Test Donor",
    "foodType": "Rice",
    "quantity": "10 kg"
  }'
```

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure DynamoDB table is properly configured
4. Check AWS CloudWatch logs for backend errors

## License

This project is for educational purposes.
