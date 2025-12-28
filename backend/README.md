# Cake Shop Backend API

Backend server for the Cake Shop application built with Node.js, Express, and MongoDB.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- npm or yarn

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account (or log in if you already have one)

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region (choose closest to you)
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username (e.g., `cakeshopadmin`)
   - Click "Autogenerate Secure Password" or create your own
   - **IMPORTANT: Copy and save the password!** You'll need it for the connection string
   - Set user privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP address
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" as the driver
   - Copy the connection string (it looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)

### Step 3: Configure Environment Variables

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   - Replace `<username>` with your MongoDB Atlas username
   - Replace `<password>` with your MongoDB Atlas password (the one you saved!)
   - Replace `<cluster-url>` with your cluster URL (e.g., `cluster0.xxxxx.mongodb.net`)
   - Update `JWT_SECRET` with a secure random string (for production)

   **Example `.env` file:**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://cakeshopadmin:MyPassword123@cluster0.abc123.mongodb.net/cake_shop?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_2024
   NODE_ENV=development
   ```

### Step 4: Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

- `POST /api/register` - Register a new user
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/login` - Login user
  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```

### User Routes (Protected)

- `GET /api/user/profile` - Get current user profile (requires token)
- `GET /api/users` - Get all users (Admin only, requires token)

### Health Check

- `GET /api/health` - Check if server is running

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token_here>
```

## 📁 Project Structure

```
backend/
├── models/
│   └── User.js          # User model schema
├── routes/
│   ├── auth.js          # Authentication routes
│   └── users.js         # User routes
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment file
├── .gitignore           # Git ignore file
├── server.js            # Main server file
├── package.json         # Dependencies
└── README.md           # This file
```

## 🛠️ Troubleshooting

### MongoDB Connection Issues

1. **Check your connection string** - Make sure username, password, and cluster URL are correct
2. **Verify network access** - Ensure your IP is whitelisted in MongoDB Atlas
3. **Check password encoding** - If your password has special characters, URL encode them (e.g., `@` becomes `%40`)

### Port Already in Use

If port 5000 is already in use, change the `PORT` in your `.env` file.

## 📝 Notes

- The `.env` file is not committed to git for security
- Always use strong passwords for production
- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt before storage

## 🔗 Frontend Integration

The frontend is configured to connect to `http://localhost:5000/api` for all API calls.

