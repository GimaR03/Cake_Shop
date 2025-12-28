# 🔗 Frontend & Backend URL Setup Guide

## 📍 Where to Add Which URL

### ✅ Frontend (Vercel) - Add Backend URL

**Where:** Vercel Dashboard → Your Frontend Project → Settings → Environment Variables

**Add this variable:**

| Name of Variable | Value |
|-----------------|-------|
| `REACT_APP_API_URL` | `https://your-backend-url.onrender.com` |

**Example:**
- Name: `REACT_APP_API_URL`
- Value: `https://cake-shop-backend.onrender.com`

**Why:** So your frontend knows where to send API requests.

---

### ✅ Backend (Render) - Add Frontend URL (Optional but Recommended)

**Where:** Render Dashboard → Your Backend Service → Environment → Environment Variables

**Add this variable:**

| Name of Variable | Value |
|-----------------|-------|
| `FRONTEND_URL` | `https://your-frontend-url.vercel.app` |

**Example:**
- Name: `FRONTEND_URL`
- Value: `https://cake-shop.vercel.app`

**Why:** For CORS configuration (allows your frontend to access the backend).

---

## 🚀 Step-by-Step Instructions

### Step 1: Deploy Backend First

1. Deploy backend to Render
2. Get your backend URL (e.g., `https://cake-shop-backend.onrender.com`)
3. Test it: Visit `https://your-backend-url.onrender.com/api/health`

### Step 2: Add Backend URL to Frontend (Vercel)

1. Go to https://vercel.com
2. Click on your frontend project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://your-backend-url.onrender.com` (use your actual backend URL)
   - **Environment:** Production, Preview, Development (select all)
6. Click **"Save"**
7. **Redeploy** your frontend (or it will auto-redeploy)

### Step 3: Add Frontend URL to Backend (Render) - Optional

1. Go to https://render.com
2. Click on your backend service
3. Go to **Environment** tab
4. Click **"Add Environment Variable"**
5. Add:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://your-frontend-url.vercel.app` (use your actual frontend URL)
6. Click **"Save"**
7. Backend will auto-redeploy

---

## 📋 Complete Setup Checklist

### Backend (Render) Environment Variables:
- [x] `MONGODB_URI` = `mongodb+srv://...`
- [x] `JWT_SECRET` = `your-secret-key`
- [x] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = `https://your-frontend.vercel.app` (add after frontend deploys)

### Frontend (Vercel) Environment Variables:
- [ ] `REACT_APP_API_URL` = `https://your-backend.onrender.com` (add after backend deploys)

---

## 🎯 Quick Answer

### ✅ YES - Add Backend URL to Frontend (Required)

**In Vercel:**
- Name: `REACT_APP_API_URL`
- Value: Your Render backend URL (e.g., `https://cake-shop-backend.onrender.com`)

### ✅ YES - Add Frontend URL to Backend (Recommended)

**In Render:**
- Name: `FRONTEND_URL`
- Value: Your Vercel frontend URL (e.g., `https://cake-shop.vercel.app`)

---

## 📝 Example URLs

**Backend URL (from Render):**
```
https://cake-shop-backend.onrender.com
```

**Frontend URL (from Vercel):**
```
https://cake-shop.vercel.app
```

---

## ⚠️ Important Notes

1. **Deploy Backend First** - Get backend URL before deploying frontend
2. **Add Backend URL to Frontend** - Required for API calls
3. **Add Frontend URL to Backend** - Recommended for CORS
4. **Redeploy After Adding** - Both services need to restart

---

## 🔍 How to Verify

### Test Backend:
```
https://your-backend.onrender.com/api/health
```
Should return: `{"status":"OK",...}`

### Test Frontend:
- Open your frontend URL
- Try to register/login
- Check browser console for API calls
- Should connect to your backend URL

---

## 🆘 Troubleshooting

### Problem: Frontend can't connect to backend
**Solution:**
- Verify `REACT_APP_API_URL` is set in Vercel
- Check the URL is correct (no trailing slash)
- Redeploy frontend after adding variable

### Problem: CORS errors
**Solution:**
- Add `FRONTEND_URL` to backend environment variables
- Restart backend service
- Check CORS settings in `server.js`

---

## ✅ Summary

1. **Backend → Frontend:** Add backend URL to frontend (REACT_APP_API_URL) ✅ Required
2. **Frontend → Backend:** Add frontend URL to backend (FRONTEND_URL) ✅ Recommended

Both should be added! 🚀

