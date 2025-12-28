# 🔧 Registration Error Troubleshooting Guide

## Common Issues and Solutions

### 1. "Server error during registration"

**Possible Causes:**
- Backend server is not running
- MongoDB connection issue
- Validation error
- Username already exists

**Solutions:**

#### Check Backend Server
1. Open a terminal and navigate to backend folder:
   ```bash
   cd backend
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

3. You should see:
   ```
   ✅ MongoDB Connected: ...
   🚀 Server running on port 5000
   ```

#### Check MongoDB Connection
1. Verify your `.env` file in `backend` folder has correct MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake_shop?retryWrites=true&w=majority
   ```

2. Check MongoDB Atlas:
   - Cluster is running (green status)
   - Network Access allows your IP
   - Database user credentials are correct

#### Check Registration Data
Make sure you're entering:
- ✅ **Nickname**: At least 2 characters
- ✅ **Gender**: Select "Male" or "Female" (not empty)
- ✅ **Username**: At least 3 characters, unique (not already taken)
- ✅ **Password**: At least 6 characters

### 2. "Username already taken"

**Solution:**
- Choose a different username
- The username must be unique in the database

### 3. "Cannot connect to server"

**Solution:**
1. Make sure backend is running:
   ```bash
   cd backend
   npm run dev
   ```

2. Check if port 5000 is available:
   - Open http://localhost:5000/api/health in browser
   - Should show: `{"status":"OK","message":"Cake Shop Backend is running"}`

3. Check browser console (F12) for CORS errors

### 4. Validation Errors

**Common validation errors:**
- **Nickname**: Must be 2-50 characters
- **Username**: Must be 3-30 characters, unique
- **Password**: Must be at least 6 characters
- **Gender**: Must be "male" or "female"

## Testing Registration

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Try Registration:**
   - Go to Register page
   - Fill in all fields:
     - Nickname: "John"
     - Gender: "Male" or "Female"
     - Username: "john123" (unique)
     - Password: "password123" (at least 6 chars)
   - Click Register

4. **Check Error Messages:**
   - If error occurs, the detailed error message will be displayed
   - Check browser console (F12) for more details
   - Check backend terminal for server logs

## Quick Fix Checklist

- [ ] Backend server is running (`npm run dev` in backend folder)
- [ ] MongoDB is connected (check backend console)
- [ ] All form fields are filled correctly
- [ ] Username is unique (not already registered)
- [ ] Password is at least 6 characters
- [ ] Gender is selected (not empty)
- [ ] Check browser console for errors (F12)
- [ ] Check backend terminal for error logs

## Still Having Issues?

1. **Check Backend Logs:**
   - Look at the terminal where backend is running
   - Look for error messages starting with "Registration error:"

2. **Check Browser Console:**
   - Press F12 in browser
   - Go to Console tab
   - Look for red error messages

3. **Verify Data:**
   - Check what data is being sent (should see in console: "Registering user with data")
   - Make sure all fields have values

4. **Test API Directly:**
   ```bash
   curl -X POST http://localhost:5000/api/register \
     -H "Content-Type: application/json" \
     -d '{"nickname":"Test","gender":"male","username":"testuser123","password":"test123"}'
   ```

