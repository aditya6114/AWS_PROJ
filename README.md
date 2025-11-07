# 🍽️ FoodChain - Food Donation Platform

A modern, secure food donation platform built with Next.js 15, featuring role-based authentication, AWS DynamoDB integration, and JWT token management.

## ✨ Features

- 🔐 **Custom JWT Authentication** - Secure, token-based authentication system
- 👥 **Role-Based Access Control** - Separate dashboards for Donors and Receivers
- ☁️ **AWS DynamoDB Integration** - Scalable, serverless user data storage
- 🎨 **Modern UI** - Beautiful, responsive design with TailwindCSS
- 🔒 **Secure Password Hashing** - bcrypt with 10 salt rounds
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast & Efficient** - Built on Next.js 15 with App Router

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- AWS Account with DynamoDB access
- AWS Access Key ID and Secret Access Key

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd final
npm install
```

### 2. Setup DynamoDB
Create a table in AWS DynamoDB:
- **Table name**: `Users`
- **Partition key**: `email` (String)

Or use AWS CLI:
```bash
aws dynamodb create-table \
    --table-name Users \
    --attribute-definitions AttributeName=email,AttributeType=S \
    --key-schema AttributeName=email,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region ap-south-1
```

### 3. Configure Environment
Create `.env.local` file:
```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
DYNAMO_DB_TABLE=Users
JWT_SECRET=your_super_secret_jwt_key
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run the Application
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[SETUP.md](./SETUP.md)** - Detailed setup guide with troubleshooting
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview

## 🏗️ Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── signup/            # User registration
│   │   ├── login/             # User authentication
│   │   └── donations/         # Donation endpoints
│   ├── context/               # React Context
│   │   └── AuthContext.tsx    # Authentication state
│   ├── components/            # Shared components
│   ├── donor-dashboard/       # Donor interface
│   └── receiver-dashboard/    # Receiver interface
├── components/                # UI components
├── lib/                       # Utilities
│   ├── dynamodb.ts           # DynamoDB client
│   ├── jwt.ts                # JWT utilities
│   └── middleware.ts         # Auth middleware
└── scripts/                   # Helper scripts
```

## 🎯 User Roles

### 👨‍🌾 Donor
- Create food donations
- Access donor dashboard
- Track donation status

### 🤝 Receiver
- View available donations
- Claim donations
- Access receiver dashboard

## 🔐 API Endpoints

### Public
- `POST /api/signup` - Register new user
- `POST /api/login` - Authenticate user

### Protected
- `POST /api/donations/create` - Create donation (Donor only)
- `GET /api/donations/list` - List donations (Receiver only)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: AWS DynamoDB
- **Authentication**: JWT, bcrypt
- **Language**: TypeScript, JavaScript

## 🧪 Testing

### Create Test Users

**Donor Account:**
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

**Receiver Account:**
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Receiver",
    "email": "receiver@test.com",
    "password": "password123",
    "role": "receiver"
  }'
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token expiration (1 hour)
- ✅ Role-based route protection
- ✅ Secure environment variable management
- ✅ Input validation
- ✅ Protected API endpoints

## 🐛 Troubleshooting

**DynamoDB Connection Issues:**
- Verify AWS credentials in `.env.local`
- Check IAM permissions
- Ensure table exists in correct region

**Authentication Errors:**
- Clear browser localStorage
- Check JWT_SECRET is set
- Verify token hasn't expired

**Role Access Denied:**
- Confirm user role is correct
- Check middleware configuration
- Verify token includes role claim

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_REGION` | AWS region | `ap-south-1` |
| `AWS_ACCESS_KEY_ID` | AWS access key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `DYNAMO_DB_TABLE` | DynamoDB table name | `Users` |
| `JWT_SECRET` | JWT signing secret | `random_32_byte_hex_string` |

## 🚀 Deployment

### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### AWS Amplify
1. Connect repository
2. Configure build settings
3. Add environment variables
4. Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- AWS for DynamoDB
- TailwindCSS for the styling system

---

**Made with ❤️ for making a difference, one meal at a time.**
