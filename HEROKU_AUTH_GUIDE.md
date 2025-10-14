# Heroku Authentication & Deployment Guide

## 🔐 Step 1: Heroku Account Setup

### Create Heroku Account (if you don't have one):
1. Go to [heroku.com](https://heroku.com)
2. Click **"Sign up"**
3. Enter your email and create a password
4. Verify your email address
5. Add a credit card (required for custom domains, but free tier available)

## 🛠️ Step 2: Install Heroku CLI

### Windows Installation:
1. Download from: [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. Run the installer
3. Restart your command prompt/PowerShell

### Verify Installation:
```bash
heroku --version
```

## 🔑 Step 3: Authenticate with Heroku

### Login Process:
1. Open your terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd C:\Users\Dan\Desktop\website_momentum\momentum_web
   ```

3. Run the login command:
   ```bash
   heroku login
   ```

4. **This will open your browser** - log in with your Heroku credentials
5. **Return to terminal** - you should see "Logged in as your-email@domain.com"

## 🚀 Step 4: Deploy to Heroku

### Create Heroku App:
```bash
heroku create momentum-digital-website
```
*This creates a unique app name like `momentum-digital-website-12345`*

### Add Files to Git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Momentum Digital website"
```

### Deploy to Heroku:
```bash
git push heroku main
```

### Open Your App:
```bash
heroku open
```

## 🔧 Step 5: Verify Deployment

Your app will be available at: `https://momentum-digital-website-12345.herokuapp.com`

### Check App Status:
```bash
heroku ps
```

### View Logs:
```bash
heroku logs --tail
```

## 🌐 Step 6: Custom Domain (Optional)

### Add Custom Domain:
```bash
heroku domains:add www.yourdomain.com
heroku domains:add yourdomain.com
```

### Update DNS Records:
- **CNAME**: `www` → `momentum-digital-website-12345.herokuapp.com`
- **A Record**: `@` → Heroku IP addresses

## 🔄 Step 7: Making Updates

### After making changes to your website:
```bash
git add .
git commit -m "Update website content"
git push heroku main
```

## 🆘 Troubleshooting

### Common Issues:

1. **"Not logged in" error**:
   ```bash
   heroku login
   ```

2. **"App not found" error**:
   ```bash
   heroku apps
   ```
   Check your app name and use the correct one.

3. **"Build failed" error**:
   ```bash
   heroku logs --tail
   ```
   Check the logs for specific error messages.

4. **"Permission denied" error**:
   - Make sure you're logged in: `heroku auth:whoami`
   - Check app ownership: `heroku apps:info`

### Reset Authentication:
```bash
heroku logout
heroku login
```

## 📊 Heroku Dashboard

You can also manage your app through the web dashboard:
1. Go to [dashboard.heroku.com](https://dashboard.heroku.com)
2. Click on your app
3. View metrics, logs, and settings

## 💰 Heroku Pricing

- **Free Tier**: No longer available (discontinued)
- **Basic Plan**: $7/month - includes custom domains
- **Standard Plan**: $25/month - includes more features

## 🔒 Security Notes

- Your Heroku credentials are stored locally
- Never share your Heroku API key
- Use environment variables for sensitive data
- Enable two-factor authentication on your Heroku account

---

## 🎯 Quick Commands Reference

```bash
# Login
heroku login

# Create app
heroku create app-name

# Deploy
git push heroku main

# Open app
heroku open

# View logs
heroku logs --tail

# Check status
heroku ps

# Add domain
heroku domains:add www.yourdomain.com

# Logout
heroku logout
```

Your Momentum Digital website will be live and accessible worldwide once deployed! 🌍
