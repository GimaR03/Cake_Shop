# Railway Deploy Triggers Configuration

## What are Deploy Triggers?

Deploy Triggers tell Railway **which files** should trigger a new deployment when changed. This prevents unnecessary deployments when you only change frontend or documentation files.

## ✅ Recommended Patterns for Backend

Add these patterns in Railway → Settings → Deploy Triggers:

### Pattern 1: Watch only backend folder
```
backend/**
```

### Pattern 2: Watch specific backend files
```
backend/**/*.js
backend/**/*.json
backend/**/*.yaml
backend/**/*.yml
```

### Pattern 3: Exclude frontend (if you want to ignore frontend changes)
```
!frontend/**
```

## 🎯 Best Configuration for Your Project

Since your backend is in the `backend/` folder, use:

### Option 1: Simple (Recommended)
```
backend/**
```

This watches **everything** in the backend folder.

### Option 2: Specific Files Only
```
backend/**/*.js
backend/**/*.json
backend/package.json
backend/server.js
backend/**/*.js
!backend/node_modules/**
!backend/uploads/**
```

This watches only code files, not node_modules or uploads.

### Option 3: Exclude Frontend Completely
```
backend/**
!frontend/**
```

This watches backend but ignores frontend changes.

## 📋 What Each Pattern Does

| Pattern | Meaning |
|---------|---------|
| `backend/**` | Watch all files in backend folder and subfolders |
| `backend/**/*.js` | Watch only .js files in backend |
| `!frontend/**` | Ignore everything in frontend folder |
| `!backend/node_modules/**` | Ignore node_modules in backend |
| `!backend/uploads/**` | Ignore uploads folder |

## 🚀 Recommended Setup

**For your Cake Shop backend, use:**

```
backend/**
!backend/node_modules/**
!backend/uploads/**
!frontend/**
```

This will:
- ✅ Deploy when backend code changes
- ✅ Deploy when package.json changes
- ❌ Skip deployment for frontend changes
- ❌ Skip deployment for node_modules
- ❌ Skip deployment for uploaded images

## 💡 Pro Tips

1. **Start Simple**: Just use `backend/**` if you're unsure
2. **Test It**: Make a small change to backend and see if it triggers
3. **Check Logs**: Railway shows which files triggered the deployment

## 🔧 How to Add in Railway

1. Go to your Railway project
2. Click on your service
3. Go to **Settings** tab
4. Scroll to **"Deploy Triggers"** section
5. Click **"Add pattern"**
6. Enter: `backend/**`
7. Click **Save**

## ⚠️ Important Notes

- Patterns are **case-sensitive**
- Use `**` for recursive matching
- Use `!` prefix to exclude patterns
- Order matters - more specific patterns should come first

