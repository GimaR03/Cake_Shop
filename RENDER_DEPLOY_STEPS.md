# 🚀 Deploy Backend to Render (Fix Upload Error)

## ✅ Why Switch to Render?

**Your current error:**
```
Error: ENOENT: no such file or directory, mkdir 'uploads/products'
```

**Why it happens:**
- Vercel serverless functions have **read-only filesystem**
- Cannot create directories or store files
- Only `/tmp` is writable (and files are deleted after execution)

**Solution: Switch to Render**
- ✅ Supports local file storage
- ✅ Your code works as-is
- ✅ Images persist correctly
- ✅ Free tier available

---

## 📋 Step-by-Step Guide

### Step 1: Go to Render

1. Visit **https://render.com**
2. Click **"Get Started for Free"** or **"Sign Up"**
3. Sign up with GitHub (easiest)

---

### Step 2: Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect GitHub"** (if not connected)
4. Authorize Render to access your repositories
5. Select repository: **`Cake_Shop`**

---

### Step 3: Configure Service

Fill in these settings:

**Basic Settings:**
- **Name:** `cake-shop-backend`
- **Region:** Choose closest to you (e.g., `Singapore` or `Oregon`)
- **Branch:** `main` (or your default branch)
- **Root Directory:** `backend` ⚠️ **IMPORTANT!**
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** `Free` (or `Starter` if you want)

**⚠️ CRITICAL:** Make sure **Root Directory** is set to `backend`!

---

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake_shop?retryWrites=true&w=majority` |
| `JWT_SECRET` | `cake_shop_jwt_secret_key_2024` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your Vercel frontend URL (e.g., `https://your-frontend.vercel.app`) |

**Note:** 
- Click **"Save Changes"** after adding each variable
- Make sure no extra spaces or quotes

---

### Step 5: Deploy

1. Scroll down and click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Install dependencies
   - Start your server
3. Wait 5-10 minutes for first deployment
4. You'll see build logs in real-time

---

### Step 6: Get Your Backend URL

After deployment succeeds:

1. You'll see a URL like: `https://cake-shop-backend.onrender.com`
2. **Copy this URL** - you'll need it for the frontend

**Test it:**
- Visit: `https://your-backend-url.onrender.com/api/health`
- Should return: `{"status":"OK",...}`

---

### Step 7: Update Frontend

1. Go to **Vercel Dashboard**
2. Select your **frontend project**
3. Go to **Settings** → **Environment Variables**
4. Find `REACT_APP_API_URL`
5. Update value to: `https://your-backend-url.onrender.com`
6. Click **"Save"**
7. Go to **Deployments** tab
8. Click **"Redeploy"** → **"Redeploy"** (latest deployment)

**Wait for redeploy to complete (2-3 minutes)**

---

### Step 8: Test Image Upload

1. Go to your website
2. Login as admin (`ShabeeCakeHub` / `Shabee20020720`)
3. Go to Admin page
4. Try uploading an image
5. **Error should be gone!** ✅
6. Image should display correctly! ✅

---

## ✅ Success Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL accessible (health check works)
- [ ] Environment variables added
- [ ] Frontend `REACT_APP_API_URL` updated
- [ ] Frontend redeployed
- [ ] Image upload works without errors
- [ ] Images display correctly on website

---

## 🔧 Troubleshooting

### Error: "Root Directory not found"

**Fix:** Make sure Root Directory is exactly `backend` (lowercase, no spaces)

### Error: "Build failed"

**Fix:** 
- Check build logs
- Make sure `backend/package.json` exists
- Make sure `backend/server.js` exists

### Error: "Cannot connect to MongoDB"

**Fix:**
- Check `MONGODB_URI` is correct
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Images still not working

**Fix:**
- Make sure frontend `REACT_APP_API_URL` is updated
- Make sure frontend is redeployed
- Clear browser cache
- Check browser console for errors

---

## 📊 Render Free Tier Limits

- **750 hours/month** (enough for 24/7)
- **512 MB RAM**
- **Auto-sleeps** after 15 minutes of inactivity
- **Takes 30-60 seconds to wake up** after sleep

**For production:** Consider upgrading to Starter ($7/month) for:
- No sleep
- More resources
- Better performance

---

## 🎯 Summary

**Problem:** Vercel can't store files → Upload error

**Solution:** Switch backend to Render

**Time:** 10-15 minutes

**Result:** 
- ✅ Upload error fixed
- ✅ Images work correctly
- ✅ No code changes needed

**You're done!** 🎉

---

## 💡 Pro Tips

1. **Keep frontend on Vercel** - Perfect for React apps
2. **Use Render for backend** - Perfect for file uploads
3. **Monitor Render logs** - Check for any issues
4. **Set up auto-deploy** - Render auto-deploys on git push

**Best setup:**
- Frontend → Vercel ✅
- Backend → Render ✅

---

## 🆘 Need Help?

If you encounter any issues:
1. Check Render build logs
2. Check Render service logs
3. Verify environment variables
4. Test backend health endpoint
5. Check frontend console for errors

**Good luck!** 🚀

