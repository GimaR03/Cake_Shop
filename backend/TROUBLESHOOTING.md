# 🔧 Troubleshooting Login Issues

## ✅ Admin User Created Successfully!

The admin user has been created with:
- **Username:** `ShabeeCakeHub`
- **Password:** `Shabee20020720`
- **Role:** `admin`

## 🚀 Steps to Fix "Invalid Credentials" Error

### 1. Make Sure Backend Server is Running

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: ...
🚀 Server running on port 5000
```

### 2. Verify MongoDB Connection

Check that your `.env` file has the correct MongoDB connection string:
```
MONGODB_URI=mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake_shop?retryWrites=true&w=majority
```

### 3. Test Login

Try logging in with:
- **Username:** `ShabeeCakeHub`
- **Password:** `Shabee20020720`

### 4. Check Backend Console

When you try to login, check the backend console for error messages:
- If you see "User not found" - the admin user doesn't exist
- If you see "Invalid password" - password doesn't match
- If you see "Login successful" - it's working!

### 5. Re-create Admin User (if needed)

If the admin user still doesn't work, run:

```bash
cd backend
node scripts/createAdmin.js
```

This will:
- Check if admin exists
- Create admin if it doesn't exist
- Skip if admin already exists

## 🔍 Common Issues

### Issue: "Invalid credentials" but user exists
**Solution:** 
1. Check backend server is running
2. Verify MongoDB connection is working
3. Check backend console for detailed error messages

### Issue: Backend not connecting to MongoDB
**Solution:**
1. Check your internet connection
2. Verify MongoDB Atlas cluster is running (green status)
3. Check IP whitelist in MongoDB Atlas Network Access
4. Verify connection string in `.env` file

### Issue: Password not working
**Solution:**
1. Make sure you're using exact password: `Shabee20020720`
2. Check for extra spaces before/after password
3. Re-create admin user: `node scripts/createAdmin.js`

## 📝 Testing Steps

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

3. **Test Login:**
   - Click user icon in navbar
   - Enter: `ShabeeCakeHub` / `Shabee20020720`
   - Should redirect to Admin page

## ✅ Success Indicators

- Backend shows: `✅ MongoDB Connected`
- Backend shows: `🚀 Server running on port 5000`
- Login redirects to `/admin` page
- No "Invalid credentials" error

