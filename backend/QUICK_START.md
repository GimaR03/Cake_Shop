# 🚀 Quick Start Guide

## ✅ Your MongoDB is Already Configured!

Your backend is ready to use with:
- **Username:** ShabeeCakeHub
- **Cluster:** cluster0.jsq2cda.mongodb.net
- **Database:** cake_shop

## 📦 Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- express (web server)
- mongoose (MongoDB driver)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (cross-origin requests)
- dotenv (environment variables)
- nodemon (development auto-reload)

## 🏃 Step 2: Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.jsq2cda.mongodb.net
🚀 Server running on port 5000
📍 API available at http://localhost:5000/api
```

## 👤 Step 3: Create Admin User (Optional)

If you want to create the admin user `ShabeeCakeHub` with password `Shabee20020720`:

```bash
node scripts/createAdmin.js
```

## 🧪 Step 4: Test the API

### Health Check
Open your browser or use curl:
```
http://localhost:5000/api/health
```

### Register a Test User
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"test123\"}"
```

## 🎯 Your Frontend is Ready!

Your React frontend is already configured to connect to:
- `http://localhost:5000/api/register` - Registration
- `http://localhost:5000/api/login` - Login

Just make sure both servers are running:
1. **Backend:** `cd backend && npm run dev` (port 5000)
2. **Frontend:** `cd frontend && npm start` (port 3000)

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Check your internet connection
- Verify MongoDB Atlas cluster is running (green status)
- Make sure your IP is whitelisted in MongoDB Atlas Network Access

### "Port 5000 already in use"
- Change `PORT=5001` in `.env` file
- Update frontend API calls to use port 5001

### "Module not found"
- Run `npm install` in the backend folder

## 📝 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start server: `npm run dev`
3. ✅ Test connection: Visit `http://localhost:5000/api/health`
4. ✅ Create admin user: `node scripts/createAdmin.js`
5. ✅ Start frontend: `cd ../frontend && npm start`

You're all set! 🎉

