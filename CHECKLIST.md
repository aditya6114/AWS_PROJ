# 📋 Setup Checklist

Use this checklist to ensure you've completed all setup steps correctly.

## ☑️ Prerequisites
- [ ] Node.js 18+ installed
- [ ] AWS Account created
- [ ] AWS CLI installed (optional but recommended)
- [ ] Git installed

## ☑️ AWS DynamoDB Setup
- [ ] Logged into AWS Console
- [ ] Navigated to DynamoDB service
- [ ] Created `Users` table
- [ ] Set partition key as `email` (String)
- [ ] Table status is ACTIVE
- [ ] Created AWS Access Key ID
- [ ] Created AWS Secret Access Key
- [ ] Noted down both keys securely

## ☑️ Project Setup
- [ ] Cloned/downloaded project
- [ ] Navigated to project directory
- [ ] Ran `npm install`
- [ ] All dependencies installed successfully
- [ ] No critical errors in installation

## ☑️ Environment Configuration
- [ ] Created `.env.local` file in project root
- [ ] Added `AWS_REGION=ap-south-1`
- [ ] Added `AWS_ACCESS_KEY_ID=<your_key>`
- [ ] Added `AWS_SECRET_ACCESS_KEY=<your_secret>`
- [ ] Added `DYNAMO_DB_TABLE=Users`
- [ ] Generated JWT secret using crypto
- [ ] Added `JWT_SECRET=<your_secret>`
- [ ] Verified no spaces or quotes around values
- [ ] Saved `.env.local` file

## ☑️ First Run
- [ ] Ran `npm run dev`
- [ ] No compilation errors
- [ ] Server started successfully
- [ ] Opened http://localhost:3000
- [ ] Login/Signup page loads correctly
- [ ] No console errors in browser

## ☑️ Test Donor Flow
- [ ] Clicked "Sign Up"
- [ ] Entered name, email, password
- [ ] Selected "Donate Food" role
- [ ] Submitted form successfully
- [ ] Redirected to donor dashboard
- [ ] Can see "Create New Donation" form
- [ ] Created a test donation
- [ ] Received success message
- [ ] Logged out successfully

## ☑️ Test Receiver Flow
- [ ] Opened new incognito/private window
- [ ] Went to http://localhost:3000
- [ ] Clicked "Sign Up"
- [ ] Entered different email
- [ ] Selected "Receive Food" role
- [ ] Submitted form successfully
- [ ] Redirected to receiver dashboard
- [ ] Can see "Available Donations" list
- [ ] Donations are displayed correctly
- [ ] Can claim/update donation status

## ☑️ Security Verification
- [ ] Passwords are not visible in DynamoDB (hashed)
- [ ] Cannot access donor dashboard as receiver
- [ ] Cannot access receiver dashboard as donor
- [ ] Token expires after 1 hour
- [ ] Logout clears authentication
- [ ] Protected routes require authentication
- [ ] `.env.local` is in `.gitignore`

## ☑️ DynamoDB Verification
- [ ] Opened AWS DynamoDB Console
- [ ] Navigated to Users table
- [ ] Can see registered users
- [ ] Email is partition key
- [ ] passwordHash is present (not plain password)
- [ ] role field shows "donor" or "receiver"
- [ ] createdAt timestamp is present

## ☑️ Troubleshooting (if needed)
- [ ] Checked browser console for errors
- [ ] Checked terminal for server errors
- [ ] Verified AWS credentials are correct
- [ ] Confirmed DynamoDB table exists
- [ ] Checked IAM permissions for DynamoDB
- [ ] Cleared browser localStorage
- [ ] Restarted development server
- [ ] Reviewed SETUP.md for solutions

## ☑️ Optional Enhancements
- [ ] Read PROJECT_SUMMARY.md
- [ ] Tested API endpoints with curl/Postman
- [ ] Explored code structure
- [ ] Customized UI colors/styling
- [ ] Added additional features
- [ ] Set up production deployment

## 🎉 Completion

If all checkboxes are marked, congratulations! Your FoodChain application is fully set up and working.

### Next Steps:
1. **Customize**: Modify the UI to match your preferences
2. **Extend**: Add new features from the enhancement list
3. **Deploy**: Deploy to Vercel or AWS Amplify
4. **Share**: Share your project with others

### Need Help?
- Review [SETUP.md](./SETUP.md) for detailed instructions
- Check [QUICK_START.md](./QUICK_START.md) for quick reference
- Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for architecture details

---

**Happy Coding! 🚀**
