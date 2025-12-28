# Railway Deployment Fix Guide

## ✅ Your Backend Structure is CORRECT!

Your backend folder structure is perfect:
```
Cake_Shop/
 ┣ backend/
 │   ┣ package.json   ✅ EXISTS
 │   ┣ server.js      ✅ EXISTS
 │   ┣ routes/       ✅ EXISTS
 │   ┣ models/        ✅ EXISTS
 │   ┗ ...
 ┣ frontend/
 ┗ ...
```

## ✅ Your package.json is CORRECT!

Your `backend/package.json` has everything needed:
- ✅ `"main": "server.js"`
- ✅ `"start": "node server.js"` script
- ✅ All dependencies listed

## 🔧 Railway Configuration Steps

### Step 1: Set Root Directory in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to **Settings** tab
4. Find **Root Directory** section
5. Set it to: `backend`
6. Click **Save**

### Step 2: Verify Build Settings

In Railway, make sure:
- **Build Command**: Leave empty (Railway auto-detects)
- **Start Command**: Leave empty (uses `npm start` from package.json)

### Step 3: Add Environment Variables

Go to **Variables** tab and add:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake-shop` |
| `JWT_SECRET` | (Generate a random string) |
| `NODE_ENV` | `production` |
| `PORT` | (Leave empty - Railway sets this) |

### Step 4: Check Node Version (Optional but Recommended)

Add to `backend/package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

Or create `backend/.nvmrc` file:
```
18
```

## 🚨 Common Railway Issues & Fixes

### Issue 1: "Cannot find package.json"
**Fix**: Make sure Root Directory is set to `backend` (not empty, not `/backend`)

### Issue 2: "Cannot find module"
**Fix**: Make sure `node_modules` is NOT committed to GitHub. Add to `.gitignore`:
```
node_modules/
```

### Issue 3: Build fails
**Fix**: 
1. Check Railway logs for specific error
2. Verify all dependencies in `package.json`
3. Make sure `package-lock.json` is committed

### Issue 4: Server starts but crashes
**Fix**:
1. Check environment variables are set correctly
2. Verify MongoDB connection string
3. Check Railway logs for error messages

## 📋 Pre-Deployment Checklist

- [ ] Root Directory set to `backend` in Railway
- [ ] `package.json` exists in `backend/` folder
- [ ] `server.js` exists in `backend/` folder
- [ ] `"start": "node server.js"` in package.json scripts
- [ ] Environment variables added in Railway
- [ ] `node_modules/` is in `.gitignore`
- [ ] Code pushed to GitHub
- [ ] Railway connected to GitHub repo

## 🔍 Verify Your Setup

Run these checks locally:
```bash
cd backend
npm install
npm start
```

If this works locally, it should work on Railway!

## 📞 Still Having Issues?

1. Check Railway deployment logs
2. Verify GitHub repo structure matches above
3. Make sure Root Directory is exactly `backend` (case-sensitive)
4. Check that `package.json` and `server.js` are in the same folder

