# MongoDB Atlas Connection Setup Guide

## Quick Fix for IP Whitelisting Error

If you're seeing this error:
```
❌ MongoDB connection error: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

### Step-by-Step Solution:

1. **Get Your Current IP Address**
   - Visit: https://whatismyipaddress.com/
   - Copy your IPv4 address (e.g., 123.45.67.89)

2. **Add IP to MongoDB Atlas Whitelist**
   - Go to: https://cloud.mongodb.com/
   - Sign in to your MongoDB Atlas account
   - Click on **"Network Access"** in the left sidebar (or "IP Access List")
   - Click the green **"Add IP Address"** button
   - Choose one of these options:
     - **Option A (Recommended for Development):** Click **"Add Current IP Address"** button
     - **Option B (Less Secure):** Enter `0.0.0.0/0` to allow all IPs (only for development/testing)
   - Click **"Confirm"**
   - Wait 1-2 minutes for the changes to take effect

3. **Restart Your Backend Server**
   ```bash
   npm start
   ```

### Alternative: Allow All IPs (Development Only)

If you're in development and want to allow all IPs temporarily:

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Enter: `0.0.0.0/0`
4. Add a comment: "Development - Allow all IPs"
5. Click "Confirm"

⚠️ **Warning:** Only use `0.0.0.0/0` for development. For production, always use specific IP addresses.

## Verify Connection

After whitelisting your IP, you should see:
```
✅ Connected to MongoDB Atlas successfully
📊 Database: shabee-cake-hub
🌐 Host: cluster0-shard-00-00.xxxxx.mongodb.net
```

## Admin Login (Works Without MongoDB)

Even if MongoDB isn't connected, you can still use admin login:
- **Username:** `ShabeeCakeHub`
- **Password:** `Shabee20020720`

This login is hardcoded and works independently of MongoDB connection.

## Troubleshooting

### Error: "ENOTFOUND" or "getaddrinfo"
- Check your internet connection
- Verify the cluster name in the connection string matches your Atlas cluster

### Error: "Authentication failed"
- Verify your MongoDB username and password are correct
- Check if the database user has proper permissions

### Connection keeps timing out
- Check MongoDB Atlas status: https://status.mongodb.com/
- Verify your firewall isn't blocking the connection
- Try increasing the timeout in `app.js` (currently 15 seconds)

## Connection String Format

The connection string should use `mongodb+srv://` format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

Make sure:
- Username and password are URL-encoded if they contain special characters
- Cluster name matches your Atlas cluster
- Database name is correct

