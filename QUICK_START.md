# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Create DynamoDB Table
Go to AWS Console → DynamoDB → Create Table:
- **Table name**: `Users`
- **Partition key**: `email` (String)
- Click "Create table"

### 2. Configure Environment
Create `.env.local` file in the project root:

```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
DYNAMO_DB_TABLE=Users
JWT_SECRET=your_random_secret_key_here
```

💡 Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Install & Run
```bash
npm install
npm run dev
```

Open http://localhost:3000

## 🎯 Test the Application

### Create a Donor Account
1. Click "Sign Up"
2. Enter your details
3. Select "Donate Food" role
4. Submit

### Create a Receiver Account
1. Open incognito/private window
2. Go to http://localhost:3000
3. Click "Sign Up"
4. Select "Receive Food" role
5. Submit

### Test Functionality
- **Donor**: Create food donations
- **Receiver**: View and claim donations

## 📋 Key Features

✅ **Role-Based Authentication**
- Donor and Receiver roles
- JWT token-based auth
- Secure password hashing

✅ **Protected Routes**
- `/donor-dashboard` - Donor only
- `/receiver-dashboard` - Receiver only
- API endpoints with role verification

✅ **DynamoDB Integration**
- User data stored in AWS DynamoDB
- Scalable and serverless

## 🔑 Default Test Credentials

Create your own users through the signup form!

## 📚 Need More Help?

See [SETUP.md](./SETUP.md) for detailed documentation.

## 🐛 Common Issues

**"Unauthorized" error?**
- Check your JWT token is valid
- Try logging out and back in

**DynamoDB connection failed?**
- Verify AWS credentials in `.env.local`
- Check IAM permissions
- Ensure table exists in correct region

**Can't access dashboard?**
- Clear browser localStorage
- Check user role is correct
- Verify token hasn't expired (1 hour expiry)
