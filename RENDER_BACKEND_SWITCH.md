# 🔄 Switch Backend from Vercel to Render - Quick Guide

## 🎯 Why Switch?

- ✅ Images will work immediately
- ✅ No code changes needed
- ✅ Free tier available
- ✅ Better for Express backends

---

## 🚀 Step-by-Step: Deploy Backend to Render

### Step 1: Go to Render

1. Go to **https://render.com**
2. Sign up or log in
3. Click **"New +"** → **"Web Service"**

### Step 2: Connect Repository

1. Click **"Connect GitHub"** (or GitLab/Bitbucket)
2. Authorize Render
3. Select repository: **`Cake_Shop`**
4. Click **"Connect"**

### Step 3: Configure Service

Fill in:

**Name:**
```
cake-shop-backend
```

**Root Directory:**
```
backend
```
⚠️ **IMPORTANT!** Must be exactly `backend`

**Environment:**
```
Node
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Plan:**
```
Free
```

### Step 4: Add Environment Variables

Click **"Add Environment Variable"** and add:

**Variable 1:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake-shop?retryWrites=true&w=majority`

**Variable 2:**
- Key: `JWT_SECRET`
- Value: `cake_shop_jwt_secret_key_2024`

**Variable 3:**
- Key: `NODE_ENV`
- Value: `production`

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Get your backend URL: `https://cake-shop-backend.onrender.com`

### Step 6: Update Frontend

1. Go to **Vercel** → Your frontend project
2. **Settings** → **Environment Variables**
3. Update `REACT_APP_API_URL`:
   - Old: `https://cake-shop-umber.vercel.app`
   - New: `https://cake-shop-backend.onrender.com`
4. **Redeploy** frontend

---

## ✅ After Switch

**Your setup:**
- ✅ Backend: Render (images work!)
- ✅ Frontend: Vercel (perfect for React)

**Images will now:**
- ✅ Upload successfully
- ✅ Store in `uploads/products/` folder
- ✅ Be accessible via `/uploads/products/...`
- ✅ Persist between deployments

---

## 🎉 Benefits

1. **Images work immediately** - No code changes
2. **Free tier** - 750 hours/month
3. **Easy setup** - 5 minutes
4. **Reliable** - Perfect for Express backends

---

## 📋 Checklist

- [ ] Created Render account
- [ ] Created Web Service
- [ ] Set Root Directory: `backend`
- [ ] Added environment variables
- [ ] Deployed successfully
- [ ] Got backend URL
- [ ] Updated frontend `REACT_APP_API_URL`
- [ ] Redeployed frontend
- [ ] Tested image uploads

---

## 🆘 Troubleshooting

### Problem: "Cannot find package.json"
**Solution:** Check Root Directory is exactly `backend`

### Problem: Images still not showing
**Solution:** 
- Verify backend URL is correct in frontend
- Check backend logs in Render
- Test backend health: `https://your-backend.onrender.com/api/health`

---

## 💡 Summary

**Switch backend to Render:**
1. ✅ Deploy to Render (5 min)
2. ✅ Update frontend URL (1 min)
3. ✅ Images work! 🎉

**Much easier than using Cloudinary!** 🚀

