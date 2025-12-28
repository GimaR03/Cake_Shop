# 🚂 Railway Deployment - Complete Setup Guide

## ✅ Your Backend is Ready!

Your structure is **CORRECT**:
- ✅ `package.json` in `backend/` folder
- ✅ `server.js` in `backend/` folder  
- ✅ `"start": "node server.js"` script exists
- ✅ Node version specified in package.json

## 🔧 Railway Configuration (Step-by-Step)

### Step 1: Railway Dashboard Settings

1. **Go to your Railway project**
2. **Click on your service** (or create new service)
3. **Go to Settings tab**
4. **Find "Root Directory"**
5. **Set to**: `backend` (exactly this, no slash)
6. **Click Save**

### Step 2: Build & Deploy Settings

**Leave these EMPTY** (Railway auto-detects):
- Build Command: (empty)
- Start Command: (empty)

Railway will automatically:
- Run `npm install` (from package.json)
- Run `npm start` (from package.json scripts)

### Step 3: Environment Variables

Go to **Variables** tab, add these:

```
MONGODB_URI = mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake-shop

JWT_SECRET = (click Generate or use random string)

NODE_ENV = production
```

**DO NOT add PORT** - Railway sets this automatically.

### Step 4: Connect to GitHub (if not done)

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Railway will auto-detect it's a Node.js app

## 🎯 Quick Checklist

Before deploying, verify:

- [ ] Root Directory = `backend` (in Railway settings)
- [ ] `backend/package.json` exists
- [ ] `backend/server.js` exists
- [ ] `"start": "node server.js"` in package.json
- [ ] Environment variables added
- [ ] Code pushed to GitHub
- [ ] Railway connected to GitHub repo

## 🐛 If Still Getting Errors

### Error: "Cannot find package.json"
**Solution**: 
- Double-check Root Directory is `backend` (not `/backend`, not empty)
- Verify `package.json` is in `backend/` folder in GitHub

### Error: "Build failed"
**Solution**:
1. Check Railway logs (click on deployment)
2. Look for specific error message
3. Common issues:
   - Missing dependency in package.json
   - Node version mismatch
   - Build script error

### Error: "Module not found"
**Solution**:
- Make sure `node_modules/` is in `.gitignore`
- Railway will install dependencies automatically
- Don't commit `node_modules/`

### Error: "Port already in use"
**Solution**:
- Don't set PORT environment variable
- Railway assigns port automatically
- Your code uses `process.env.PORT || 5000` which is correct

## 📊 Verify Deployment

After deployment:

1. **Check Railway logs** - should show:
   ```
   ✅ MongoDB Connected: ...
   🚀 Server running on port ...
   ```

2. **Test health endpoint**:
   ```
   https://your-app.railway.app/api/health
   ```
   Should return: `{"status":"OK",...}`

3. **Check service URL**:
   - Railway provides a URL like: `https://your-app.up.railway.app`
   - Use this as your backend URL in frontend

## 🎉 Success!

If everything is configured correctly, Railway will:
1. Detect Node.js automatically
2. Install dependencies
3. Start your server
4. Provide a public URL

Your backend should be live! 🚀

