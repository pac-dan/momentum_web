# Deployment Guide for Momentum Digital Website

This guide will help you deploy your Momentum Digital website to both GitHub Pages and Heroku.

## 🚀 Deployment Options

### Option 1: GitHub Pages (FREE)
- **Cost**: Free
- **Custom Domain**: Supported
- **SSL**: Automatic HTTPS
- **Performance**: Good for static sites
- **Best for**: Simple deployment, version control integration

### Option 2: Heroku (PAID)
- **Cost**: $7/month for basic plan
- **Custom Domain**: Supported
- **SSL**: Automatic HTTPS
- **Performance**: Excellent
- **Best for**: More control, server-side features

---

## 📋 Prerequisites

1. **Git** installed on your computer
2. **GitHub account** (for GitHub Pages)
3. **Heroku account** (for Heroku deployment)
4. **Node.js** installed (for Heroku)

---

## 🌐 GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button and select **"New repository"**
3. Name your repository: `momentum-digital-website`
4. Make it **Public** (required for free GitHub Pages)
5. **Don't** initialize with README (you already have files)
6. Click **"Create repository"**

### Step 2: Upload Your Files

1. Open your terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd C:\Users\Dan\Desktop\website_momentum\momentum_web
   ```

3. Initialize git repository:
   ```bash
   git init
   ```

4. Add all files:
   ```bash
   git add .
   ```

5. Make your first commit:
   ```bash
   git commit -m "Initial commit - Momentum Digital website"
   ```

6. Connect to GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/momentum-digital-website.git
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username)

7. Push to GitHub:
   ```bash
   git push -u origin main
   ```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. Scroll down to **"Pages"** section
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**
7. Wait 2-3 minutes for deployment
8. Your site will be live at: `https://YOUR_USERNAME.github.io/momentum-digital-website`

### Step 4: Custom Domain (Optional)

1. In GitHub Pages settings, add your custom domain
2. Update DNS records with your domain provider:
   - **A Record**: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME Record**: `www` pointing to `YOUR_USERNAME.github.io`

---

## 🦸 Heroku Deployment

### Step 1: Install Heroku CLI

1. Download Heroku CLI from [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. Install and restart your terminal

### Step 2: Login to Heroku

```bash
heroku login
```

### Step 3: Create Heroku App

1. Navigate to your project folder:
   ```bash
   cd C:\Users\Dan\Desktop\website_momentum\momentum_web
   ```

2. Create Heroku app:
   ```bash
   heroku create momentum-digital-website
   ```
   (This will create a unique URL like `momentum-digital-website-12345.herokuapp.com`)

### Step 4: Deploy to Heroku

1. Add Heroku remote:
   ```bash
   git remote add heroku https://git.heroku.com/momentum-digital-website.git
   ```

2. Deploy:
   ```bash
   git push heroku main
   ```

3. Open your app:
   ```bash
   heroku open
   ```

### Step 5: Custom Domain (Optional)

1. Add custom domain:
   ```bash
   heroku domains:add www.yourdomain.com
   heroku domains:add yourdomain.com
   ```

2. Update DNS records:
   - **CNAME Record**: `www` pointing to `momentum-digital-website.herokuapp.com`
   - **A Record**: `@` pointing to Heroku's IP addresses

---

## 🔧 Configuration Updates Needed

Before deploying, update these files with your information:

### 1. Update package.json
Edit `package.json` and replace:
- `"yourusername"` with your actual GitHub username
- Update repository URL with your GitHub repository URL

### 2. Update Contact Information
In `index.html`, update:
- Phone numbers
- Email addresses
- Social media links

### 3. Update Meta Tags
In `index.html`, update:
- Title tag
- Meta description
- Open Graph tags

---

## 📱 Testing Your Deployment

### GitHub Pages Testing:
1. Visit your GitHub Pages URL
2. Test on mobile devices
3. Check all links and forms
4. Verify contact information

### Heroku Testing:
1. Visit your Heroku app URL
2. Test all functionality
3. Check performance
4. Verify SSL certificate

---

## 🔄 Making Updates

### For GitHub Pages:
```bash
git add .
git commit -m "Update website content"
git push origin main
```

### For Heroku:
```bash
git add .
git commit -m "Update website content"
git push heroku main
```

---

## 🆘 Troubleshooting

### GitHub Pages Issues:
- **404 Error**: Check repository name and branch settings
- **Not Updating**: Wait 5-10 minutes for GitHub to rebuild
- **Custom Domain**: Verify DNS settings and wait 24-48 hours

### Heroku Issues:
- **Build Failed**: Check `package.json` and `server.js` for errors
- **App Crashed**: Check logs with `heroku logs --tail`
- **Domain Issues**: Verify DNS propagation

---

## 📊 Performance Optimization

### For Both Platforms:
1. **Optimize Images**: Compress `logo_md.jpg`
2. **Enable Compression**: Already configured in `server.js`
3. **Add Analytics**: Add Google Analytics code
4. **SEO**: Submit sitemap to Google Search Console

### Additional Optimizations:
- Add favicon
- Implement lazy loading for images
- Add meta tags for social sharing
- Set up Google Analytics
- Add Google Search Console

---

## 🎯 Next Steps After Deployment

1. **Set up Google Analytics** for tracking visitors
2. **Submit to Google Search Console** for SEO
3. **Test contact form** functionality
4. **Set up email notifications** for form submissions
5. **Monitor performance** and user feedback
6. **Regular content updates** to keep site fresh

---

## 📞 Support

If you encounter any issues during deployment:

1. **GitHub Pages**: Check GitHub's documentation
2. **Heroku**: Use `heroku logs --tail` for debugging
3. **General**: Review this guide step by step

Your Momentum Digital website is now ready to help you grow your business online! 🚀
