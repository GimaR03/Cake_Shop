# Deployment Guide for Cake Shop Application

This guide will help you deploy both the backend and frontend of the Cake Shop application.

## Prerequisites

1. **GitHub Account** - For version control
2. **Render Account** (Free) - For backend deployment: https://render.com
3. **Vercel Account** (Free) - For frontend deployment: https://vercel.com
4. **MongoDB Atlas** - Already configured

---

## Step 1: Prepare Your Code

### 1.1 Update Frontend API URLs

The frontend has been updated to use environment variables. You need to:

1. Create a `.env` file in the `frontend` folder:
```env
REACT_APP_API_URL=http://localhost:5000
```

2. For production, you'll update this with your backend URL after deployment.

---

## Step 2: Deploy Backend to Render

### 2.1 Push Code to GitHub

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/cake-shop.git
git branch -M main
git push -u origin main
```

### 2.2 Deploy on Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `cake-shop-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = Your MongoDB connection string (from your .env file)
   - `JWT_SECRET` = A random secret string (you can generate one)
   - `PORT` = Leave empty (Render sets this automatically)

6. Click "Create Web Service"

7. Wait for deployment to complete (5-10 minutes)

8. **Copy your backend URL** (e.g., `https://cake-shop-backend.onrender.com`)

### 2.3 Update CORS Settings

After deployment, update your backend `server.js` CORS settings if needed:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app'
  ],
  credentials: true
}));
```

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Update Frontend Environment

1. Create `.env.production` in the `frontend` folder:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL.

### 3.2 Deploy on Vercel

1. Go to https://vercel.com and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - `REACT_APP_API_URL` = Your Render backend URL (e.g., `https://cake-shop-backend.onrender.com`)

6. Click "Deploy"

7. Wait for deployment (2-5 minutes)

8. **Copy your frontend URL** (e.g., `https://cake-shop.vercel.app`)

### 3.3 Update Backend CORS

Go back to Render and update the CORS origin in your backend to include your Vercel URL.

---

## Step 4: Update Image URLs

Since uploaded images are stored locally, you have two options:

### Option 1: Use Cloud Storage (Recommended)
- Set up AWS S3, Cloudinary, or similar
- Update `backend/routes/products.js` to upload to cloud storage
- Update image URLs in the database

### Option 2: Keep Local Storage
- Images won't persist across deployments
- You'll need to re-upload images after each deployment

---

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Test registration/login
3. Test product viewing
4. Test admin functions
5. Check browser console for any errors

---

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**
   - Verify `MONGODB_URI` is correct in Render environment variables
   - Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Render)

2. **Port Error**
   - Render automatically sets PORT, don't hardcode it
   - Your `server.js` already uses `process.env.PORT`

3. **CORS Errors**
   - Update CORS origin in `server.js` to include your frontend URL
   - Restart the service after changes

### Frontend Issues

1. **API Connection Error**
   - Verify `REACT_APP_API_URL` in Vercel environment variables
   - Check that backend is running and accessible
   - Test backend health endpoint: `https://your-backend.onrender.com/api/health`

2. **Build Errors**
   - Check Vercel build logs
   - Ensure all dependencies are in `package.json`
   - Verify Node version compatibility

---

## Environment Variables Summary

### Backend (Render)
- `NODE_ENV` = `production`
- `MONGODB_URI` = Your MongoDB connection string
- `JWT_SECRET` = Random secret string
- `PORT` = (Auto-set by Render)

### Frontend (Vercel)
- `REACT_APP_API_URL` = Your Render backend URL

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] MongoDB connection working
- [ ] User registration/login working
- [ ] Product viewing working
- [ ] Admin functions working
- [ ] Images loading correctly

---

## Support

If you encounter issues:
1. Check deployment logs in Render/Vercel
2. Check browser console for errors
3. Verify all environment variables are set
4. Test backend health endpoint directly

Good luck with your deployment! 🚀

