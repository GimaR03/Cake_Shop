# Quick Deployment Guide

## 🚀 Fast Deployment Steps

### Backend Deployment (Render)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to https://render.com
   - New → Web Service
   - Connect GitHub repo
   - Settings:
     - **Name**: `cake-shop-backend`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Environment Variables:
     - `MONGODB_URI` = Your MongoDB connection string
     - `JWT_SECRET` = Any random string (e.g., `your-secret-key-here`)
     - `FRONTEND_URL` = (Leave empty for now, update after frontend deploy)
   - Click "Create Web Service"
   - **Copy your backend URL** (e.g., `https://cake-shop-backend.onrender.com`)

### Frontend Deployment (Vercel)

1. **Update Environment Variable**
   - Create `.env.production` in `frontend` folder:
   ```env
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
   Replace with your actual Render backend URL

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Add New Project
   - Import GitHub repo
   - Settings:
     - **Root Directory**: `frontend`
     - **Framework**: Create React App
     - **Build Command**: `npm run build`
   - Environment Variables:
     - `REACT_APP_API_URL` = Your Render backend URL
   - Click "Deploy"
   - **Copy your frontend URL** (e.g., `https://cake-shop.vercel.app`)

3. **Update Backend CORS**
   - Go back to Render dashboard
   - Update environment variable:
     - `FRONTEND_URL` = Your Vercel frontend URL
   - Redeploy backend

### ✅ Done!

Your app is now live at your Vercel URL!

---

## 📝 Important Notes

- **Images**: Currently stored locally. They won't persist after redeployment. Consider using Cloudinary or AWS S3 for production.
- **MongoDB**: Make sure your MongoDB Atlas allows connections from Render's IPs (add `0.0.0.0/0` to Network Access)
- **Environment Variables**: Never commit `.env` files to GitHub

---

## 🔧 Troubleshooting

**Backend not connecting?**
- Check MongoDB URI in Render environment variables
- Verify MongoDB Atlas Network Access settings

**Frontend can't reach backend?**
- Verify `REACT_APP_API_URL` in Vercel environment variables
- Check CORS settings in backend
- Test backend health: `https://your-backend.onrender.com/api/health`

