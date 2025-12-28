# 🔗 Connect Frontend to Backend in Vercel

## ✅ Your Backend is Deployed!

Now you need to tell your frontend where to find the backend.

---

## 🚀 Step-by-Step Guide

### Step 1: Get Your Backend URL

1. Go to **Vercel Dashboard**: https://vercel.com
2. Click on your **backend project** (cake-shop-backend)
3. You'll see your deployment URL at the top
4. **Copy the URL** - It looks like:
   ```
   https://cake-shop-backend.vercel.app
   ```
   or
   ```
   https://cake-shop-backend-xxxxx.vercel.app
   ```

### Step 2: Add Backend URL to Frontend

1. Go to **Vercel Dashboard**
2. Click on your **frontend project** (not backend)
3. Go to **"Settings"** tab
4. Click **"Environment Variables"** (left sidebar)
5. Click **"+ Add New"** button

### Step 3: Add the Environment Variable

Fill in:

**Name:**
```
REACT_APP_API_URL
```

**Value:**
```
https://your-backend-url.vercel.app
```
(Replace with your actual backend URL from Step 1)

**Environment:** Select all three:
- ✅ Production
- ✅ Preview
- ✅ Development

Click **"Save"**

### Step 4: Redeploy Frontend

After adding the environment variable:

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click **"..."** (three dots)
4. Click **"Redeploy"**
5. Wait 2-5 minutes for redeploy

---

## 📋 Quick Checklist

- [ ] Got backend URL from Vercel
- [ ] Went to frontend project in Vercel
- [ ] Settings → Environment Variables
- [ ] Added: `REACT_APP_API_URL` = `https://your-backend-url.vercel.app`
- [ ] Selected all environments
- [ ] Redeployed frontend

---

## 🎯 Example

If your backend URL is:
```
https://cake-shop-backend.vercel.app
```

Then add to frontend:
- **Name:** `REACT_APP_API_URL`
- **Value:** `https://cake-shop-backend.vercel.app`

---

## ✅ Verify It's Working

After redeploy:

1. **Visit your frontend URL**
2. **Try to register/login**
3. **Check browser console** (F12) - Should see API calls to your backend
4. **Test features:**
   - Register a user
   - Login
   - View products
   - Add to cart

---

## 🔍 How to Check Backend URL

### In Vercel Dashboard:

1. Click on **backend project**
2. Look at the top - you'll see:
   ```
   https://cake-shop-backend.vercel.app
   ```
3. Or go to **"Domains"** tab to see all URLs

---

## ⚠️ Important Notes

1. **Variable Name Must Be Exact:**
   - `REACT_APP_API_URL` (not `REACT_APP_API` or `API_URL`)
   - React only reads variables starting with `REACT_APP_`

2. **No Trailing Slash:**
   - ✅ `https://backend.vercel.app`
   - ❌ `https://backend.vercel.app/`

3. **Must Redeploy:**
   - Adding environment variable doesn't automatically update running app
   - You must redeploy frontend after adding variable

---

## 🆘 Troubleshooting

### Problem: Frontend still uses localhost
**Solution:**
- Make sure variable name is `REACT_APP_API_URL`
- Redeploy frontend after adding variable
- Check Vercel logs to verify variable is set

### Problem: CORS errors
**Solution:**
- Add `FRONTEND_URL` to backend environment variables
- Update backend CORS settings

### Problem: API calls failing
**Solution:**
- Verify backend URL is correct
- Test backend health: `https://your-backend.vercel.app/api/health`
- Check browser console for errors

---

## 📝 Summary

**To connect frontend to backend:**

1. ✅ Get backend URL from Vercel
2. ✅ Go to frontend project → Settings → Environment Variables
3. ✅ Add: `REACT_APP_API_URL` = `https://your-backend-url.vercel.app`
4. ✅ Select all environments
5. ✅ Redeploy frontend

**That's it! Your frontend will now use your deployed backend!** 🚀

