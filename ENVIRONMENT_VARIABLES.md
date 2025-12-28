# 🔐 Environment Variables for Backend Deployment

## Required Environment Variables

### 1. MONGODB_URI (Required)
```
mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake-shop
```
**What it is**: Your MongoDB Atlas connection string  
**Required**: Yes  
**Example**: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

---

### 2. JWT_SECRET (Required)
```
(Generate a random string)
```
**What it is**: Secret key for signing JWT tokens  
**Required**: Yes  
**How to generate**: 
- Click "Generate" button in Render/Railway
- Or use a random string like: `shabee_cake_hub_jwt_secret_2024_secure_key_xyz123`
- Or generate online: https://randomkeygen.com/

**Example**: `my-super-secret-jwt-key-2024-xyz-abc-123`

---

### 3. NODE_ENV (Recommended)
```
production
```
**What it is**: Environment mode  
**Required**: No (but recommended)  
**Options**: 
- `production` - For deployed apps
- `development` - For local development

---

## Optional Environment Variables

### 4. PORT (Don't Add)
```
(Leave empty - Platform sets this automatically)
```
**What it is**: Server port number  
**Required**: No  
**Note**: Render/Railway/Vercel automatically sets this. Don't add it manually.

---

### 5. FRONTEND_URL (Optional - Add After Frontend Deploys)
```
https://your-frontend-url.vercel.app
```
**What it is**: Your frontend URL for CORS  
**Required**: No  
**When to add**: After you deploy your frontend  
**Example**: `https://cake-shop.vercel.app`

---

## 📋 Quick Reference Table

| Variable Name | Value | Required | Notes |
|--------------|-------|----------|-------|
| **MONGODB_URI** | `mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake-shop` | ✅ Yes | Your MongoDB connection |
| **JWT_SECRET** | (Generate random string) | ✅ Yes | Click Generate or use random string |
| **NODE_ENV** | `production` | ⚠️ Recommended | Set to production |
| **PORT** | (Don't add) | ❌ No | Platform sets automatically |
| **FRONTEND_URL** | (Add after frontend deploys) | ❌ No | Your Vercel frontend URL |

---

## 🚀 Step-by-Step: Adding to Render

1. Go to your Render service dashboard
2. Click on **"Environment"** tab (or **"Variables"**)
3. Click **"Add Environment Variable"**
4. Add each variable:

   **Variable 1:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake-shop`
   - Click **"Save"**

   **Variable 2:**
   - Key: `JWT_SECRET`
   - Value: Click **"Generate"** or type: `shabee-cake-hub-secret-2024-xyz-abc`
   - Click **"Save"**

   **Variable 3:**
   - Key: `NODE_ENV`
   - Value: `production`
   - Click **"Save"**

5. After adding all, your service will automatically redeploy

---

## 🚂 Step-by-Step: Adding to Railway

1. Go to your Railway project
2. Click on your service
3. Go to **"Variables"** tab
4. Click **"New Variable"**
5. Add each variable (same as above)
6. Railway auto-deploys after changes

---

## ✅ Verification

After adding environment variables:

1. **Check deployment logs** - Should show:
   ```
   ✅ MongoDB Connected: ...
   🚀 Server running on port ...
   ```

2. **Test health endpoint**:
   ```
   https://your-backend-url.onrender.com/api/health
   ```
   Should return: `{"status":"OK",...}`

3. **Test API**:
   - Try registering a user
   - Try logging in
   - Check if MongoDB connection works

---

## 🔒 Security Notes

- ✅ **Never commit** `.env` files to GitHub
- ✅ **Never share** your `JWT_SECRET` publicly
- ✅ **Never share** your `MONGODB_URI` with password publicly
- ✅ Use different `JWT_SECRET` for production vs development

---

## 🆘 Troubleshooting

### Problem: "MongoDB connection failed"
**Solution**: 
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Test connection string locally first

### Problem: "JWT_SECRET is missing"
**Solution**: 
- Make sure `JWT_SECRET` is added
- Check spelling (case-sensitive)
- Redeploy after adding

### Problem: "Cannot read property of undefined"
**Solution**: 
- Verify all required variables are set
- Check variable names are exact (case-sensitive)
- Restart service after adding variables

---

## 📝 Complete Example

Here's what your environment variables should look like in Render:

```
MONGODB_URI = mongodb+srv://ShabeeCakeHub:KO3ZWUElJjGLo02z@cluster0.jsq2cda.mongodb.net/cake-shop
JWT_SECRET = shabee-cake-hub-jwt-secret-2024-secure-key-xyz123
NODE_ENV = production
```

That's it! These 3 variables are all you need to get started. 🚀

