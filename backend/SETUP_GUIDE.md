# 🚀 Quick Setup Guide for Cake Shop Backend

## Step-by-Step MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
- Visit: https://www.mongodb.com/cloud/atlas/register
- Sign up with your email (free account is fine)

### 2. Create a Cluster
1. Click **"Build a Database"**
2. Select **FREE (M0)** tier
3. Choose your preferred cloud provider and region
4. Click **"Create"** (takes 1-3 minutes)

### 3. Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username: `cakeshopadmin` (or your choice)
5. Click **"Autogenerate Secure Password"** or create your own
6. **⚠️ COPY THE PASSWORD NOW - You won't see it again!**
7. Set privileges to **"Atlas admin"**
8. Click **"Add User"**

### 4. Configure Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your specific IP for better security
4. Click **"Confirm"**

### 5. Get Your Connection String
1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as driver
5. Copy the connection string

### 6. Update Your .env File

✅ **Your `.env` file has been configured with:**
- Username: `ShabeeCakeHub`
- Cluster: `cluster0.jsq2cda.mongodb.net`
- Database: `cake_shop`

The `.env` file is already set up in the `backend` folder. If you need to modify it, the format is:

```env
PORT=5000
MONGODB_URI=mongodb+srv://ShabeeCakeHub:YOUR_PASSWORD@cluster0.jsq2cda.mongodb.net/cake_shop?retryWrites=true&w=majority
JWT_SECRET=cake_shop_jwt_secret_key_2024
NODE_ENV=development
```

### 7. Install Dependencies and Run

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ MongoDB Connected: ...
🚀 Server running on port 5000
📍 API available at http://localhost:5000/api
```

## 🔑 Creating an Admin User

After setting up MongoDB, you can create an admin user using one of these methods:

### Method 1: Using MongoDB Compass or Atlas UI
1. Connect to your database
2. Go to the `users` collection
3. Insert a document with:
   ```json
   {
     "username": "ShabeeCakeHub",
     "email": "admin@cakeshop.com",
     "password": "$2a$10$...", // This will be hashed automatically
     "role": "admin"
   }
   ```

### Method 2: Using the API (Recommended)
1. Register a user normally through `/api/register`
2. Then manually update the role in MongoDB to "admin"

### Method 3: Use the createAdmin script
Run this in Node.js:
```javascript
const User = require('./models/User');
const user = new User({
  username: 'ShabeeCakeHub',
  email: 'admin@cakeshop.com',
  password: 'Shabee20020720',
  role: 'admin'
});
user.save();
```

## ✅ Testing Your Setup

1. **Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Register a User:**
   ```bash
   curl -X POST http://localhost:5000/api/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
   ```

3. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/login \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","password":"test123"}'
   ```

## 🆘 Troubleshooting

### "MongoServerError: Authentication failed"
- Check your username and password in the connection string
- Make sure password is URL-encoded if it has special characters

### "MongoServerError: IP not whitelisted"
- Go to Network Access in MongoDB Atlas
- Add your current IP address or allow from anywhere

### "Cannot connect to MongoDB"
- Check your internet connection
- Verify the cluster is running (green status in Atlas)
- Double-check the connection string format

### Port 5000 already in use
- Change `PORT=5000` to another port (e.g., `PORT=5001`) in `.env`
- Update frontend API calls to match the new port

## 📞 Need Help?

Check the main `README.md` file for more detailed information.

