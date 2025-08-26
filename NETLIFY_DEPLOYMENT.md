# 🚀 Netlify Deployment Guide

This guide will help you deploy the Paragraph Splitter app as a static site on Netlify.

## 📋 Prerequisites

- A [Netlify account](https://netlify.com) (free tier is sufficient)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## 🔧 Configuration Files

The following files have been configured for Netlify deployment:

### 1. `next.config.ts`
- ✅ Configured with `output: 'export'` for static export
- ✅ Added `trailingSlash: true` for better static hosting compatibility
- ✅ Set `images.unoptimized: true` to disable image optimization

### 2. `netlify.toml`
- ✅ Build command: `npm run build:static`
- ✅ Publish directory: `out`
- ✅ SPA routing redirects configured
- ✅ Security headers added
- ✅ Static asset caching optimized

### 3. `package.json`
- ✅ Added `build:static` script for static export
- ✅ Added `serve:static` script for local testing

## 🚀 Deployment Methods

### Method 1: Git Integration (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git add .
   git commit -m "Configure for Netlify static deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Choose your Git provider and repository
   - Netlify will automatically detect the `netlify.toml` configuration

3. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - Your site will be available at a generated URL (e.g., `https://amazing-site-123456.netlify.app`)

### Method 2: Manual Upload

1. **Build the static files locally**
   ```bash
   npm run build:static
   ```

2. **Upload to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Drag and drop the `out` folder to the deploy area
   - Your site will be deployed instantly

## 🧪 Local Testing

Before deploying, test your static build locally:

```bash
# Build the static files
npm run build:static

# Serve the static files locally
npm run serve:static
```

Visit `http://localhost:3000` to test your static site.

## 📁 Generated Files

After running `npm run build:static`, you'll find these files in the `out` directory:

- `index.html` - Main application page
- `404.html` - Custom 404 error page
- `_next/` - Next.js static assets (CSS, JS, etc.)
- `favicon.ico` - Site favicon
- `robots.txt` - Search engine instructions
- `logo.svg` - Application logo

## 🔧 Custom Domain (Optional)

To use a custom domain:

1. In your Netlify site dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Enable HTTPS (automatic with Netlify)

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Ensure Node.js version compatibility (configured for Node 18 in `netlify.toml`)

### 404 Errors on Refresh
- The `netlify.toml` includes SPA redirect rules to handle client-side routing
- All routes redirect to `index.html` with a 200 status code

### Images Not Loading
- Images are configured as `unoptimized: true` for static export
- Ensure image paths are relative and assets are in the `public` folder

## 📊 Performance Optimizations

The deployment includes several optimizations:

- **Static Asset Caching**: 1-year cache for `_next/static/*` files
- **Security Headers**: XSS protection, content type sniffing prevention
- **Gzip Compression**: Automatic compression by Netlify
- **CDN Distribution**: Global CDN for fast loading worldwide

## 🎯 Next Steps

After deployment:

1. **Test thoroughly**: Check all functionality works in the deployed environment
2. **Monitor performance**: Use Netlify Analytics to track usage
3. **Set up forms**: If needed, configure Netlify Forms for contact forms
4. **Enable functions**: Use Netlify Functions for serverless backend features

## 📞 Support

If you encounter issues:

- Check [Netlify Documentation](https://docs.netlify.com)
- Review build logs in the Netlify dashboard
- Ensure your `netlify.toml` configuration is correct

---

🎉 **Congratulations!** Your Paragraph Splitter app is now ready for static deployment on Netlify!