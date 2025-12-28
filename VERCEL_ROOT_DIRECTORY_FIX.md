# 🔧 Fix Vercel Root Directory Error

## ❌ The Problem

Vercel is looking for `package.json` in the root directory, but it's in the `backend` folder.

**Error:**
```
npm error path /vercel/path0/package.json
npm error enoent Could not read package.json
```

## ✅ The Solution

You need to set the **Root Directory** to `backend` in Vercel settings.

---

## 🚀 Step-by-Step Fix

### Option 1: Fix in Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - https://vercel.com
   - Click on your project

2. **Go to Settings**
   - Click **"Settings"** tab
   - Scroll to **"General"** section

3. **Set Root Directory**
   - Find **"Root Directory"** field
   - Click **"Edit"**
   - Enter: `backend`
   - Click **"Save"**

4. **Redeploy**
   - Go to **"Deployments"** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

### Option 2: Create Root vercel.json (Alternative)

If Root Directory setting doesn't work, create `vercel.json` in the **root** of your repo:

**Create `vercel.json` in root folder:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/server.js"
    }
  ]
}
```

---

## 📋 Vercel Configuration Checklist

Make sure these are set correctly:

### In Vercel Dashboard → Settings:

- [ ] **Root Directory**: `backend` ⚠️ **MOST IMPORTANT!**
- [ ] **Framework Preset**: `Other`
- [ ] **Build Command**: (leave empty or `npm install`)
- [ ] **Output Directory**: (leave empty)
- [ ] **Install Command**: `npm install`

### Environment Variables:
- [ ] `MONGODB_URI` = `mongodb+srv://...`
- [ ] `JWT_SECRET` = `cake_shop_jwt_secret_key_2024`
- [ ] `NODE_ENV` = `production` ⚠️ (not development!)

---

## 🎯 Quick Fix Steps

1. **Vercel Dashboard** → Your Project → **Settings**
2. Find **"Root Directory"** section
3. Click **"Edit"**
4. Type: `backend`
5. Click **"Save"**
6. Go to **"Deployments"** → **"Redeploy"**

---

## ⚠️ Important Notes

- **Root Directory must be exactly:** `backend` (not `/backend`, not `./backend`)
- **Case-sensitive:** Must be lowercase `backend`
- **No trailing slash:** Just `backend`

---

## 🔍 Verify It's Fixed

After setting Root Directory and redeploying:

1. Check build logs - should show:
   ```
   Installing dependencies from backend/package.json
   ```

2. Should NOT show:
   ```
   Could not read package.json
   ```

---

## 🆘 Still Not Working?

### Try This:

1. **Delete and recreate the project:**
   - Delete current Vercel project
   - Create new project
   - **Set Root Directory to `backend` BEFORE first deploy**

2. **Or use root vercel.json:**
   - Create `vercel.json` in root folder (not backend folder)
   - Use the config above
   - This tells Vercel where to find the backend

---

## ✅ After Fix

Your deployment should:
- ✅ Find `backend/package.json`
- ✅ Install dependencies
- ✅ Build successfully
- ✅ Deploy your backend

**Set Root Directory to `backend` and redeploy!** 🚀

