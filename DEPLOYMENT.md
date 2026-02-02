# Vercel Deployment Guide

This guide will help you deploy the EcodeJR Portfolio application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository with your code pushed to GitHub, GitLab, or Bitbucket
- MongoDB Atlas database (or other cloud MongoDB provider)

## Deployment Steps

### 1. Deploy Backend

1. **Import Project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Select the `backend` directory as the root directory
   - Click "Deploy"

2. **Configure Environment Variables**
   
   Go to your project settings → Environment Variables and add:

   ```
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your_secure_random_string_here
   JWT_EXPIRE=30d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_gmail_app_password
   CLIENT_URL=https://your-frontend-domain.vercel.app
   ```

   > **Important**: After deploying the frontend, come back and update `CLIENT_URL` with your actual frontend URL.

3. **Redeploy**
   - After adding environment variables, trigger a new deployment

4. **Note Your Backend URL**
   - Copy your backend deployment URL (e.g., `https://your-backend.vercel.app`)
   - You'll need this for the frontend configuration

### 2. Deploy Frontend

1. **Import Project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository (or use the same one)
   - Select the `frontend` directory as the root directory
   - Framework Preset: Vite
   - Click "Deploy"

2. **Configure Environment Variables**
   
   Go to your project settings → Environment Variables and add:

   ```
   VITE_API_URL=https://your-backend-domain.vercel.app/api
   ```

   Replace `your-backend-domain.vercel.app` with your actual backend URL from step 1.4.

3. **Redeploy**
   - After adding environment variables, trigger a new deployment

### 3. Update Backend CORS

1. Go back to your **backend** project settings
2. Update the `CLIENT_URL` environment variable with your frontend URL:
   ```
   CLIENT_URL=https://your-frontend-domain.vercel.app
   ```
3. If you have multiple domains (e.g., custom domain + vercel domain), separate them with commas:
   ```
   CLIENT_URL=https://your-frontend.vercel.app,https://www.yourdomain.com
   ```
4. Redeploy the backend

## Post-Deployment Verification

### Test Backend
1. Visit `https://your-backend.vercel.app/api/auth/test` (if you have a test endpoint)
2. Check Vercel logs for any errors

### Test Frontend
1. Visit your frontend URL
2. Open browser DevTools → Network tab
3. Try logging in or making API calls
4. Verify that:
   - API calls are going to your backend URL
   - CORS errors are not present
   - Authentication works correctly

### Common Issues

#### CORS Errors
- **Problem**: "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
- **Solution**: 
  - Verify `CLIENT_URL` in backend environment variables matches your frontend URL exactly
  - Make sure there are no trailing slashes
  - Check that the backend has been redeployed after updating environment variables

#### API Connection Errors
- **Problem**: Frontend can't connect to backend
- **Solution**:
  - Verify `VITE_API_URL` in frontend environment variables is correct
  - Make sure it includes `/api` at the end
  - Check that backend is deployed and running

#### Database Connection Errors
- **Problem**: Backend logs show MongoDB connection errors
- **Solution**:
  - Verify `MONGODB_URI` is correct
  - Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges
  - Check that your database user has proper permissions

#### File Upload Issues
- **Problem**: File uploads fail in production
- **Note**: Vercel serverless functions have read-only filesystems. The current implementation uses local storage which won't work in production.
- **Solution**: Migrate to cloud storage (Cloudinary, AWS S3, or Vercel Blob Storage) - this is planned for future implementation.

## Custom Domains (Optional)

### Add Custom Domain to Frontend
1. Go to your frontend project → Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

### Add Custom Domain to Backend
1. Go to your backend project → Settings → Domains
2. Add your API subdomain (e.g., `api.yourdomain.com`)
3. Follow Vercel's DNS configuration instructions
4. Update frontend's `VITE_API_URL` to use the new domain
5. Update backend's `CLIENT_URL` if needed

## Monitoring

- **Vercel Dashboard**: Monitor deployments, view logs, and check analytics
- **Error Tracking**: Consider integrating Sentry or similar for production error tracking
- **Uptime Monitoring**: Use services like UptimeRobot to monitor your API availability

## Security Checklist

- ✅ All sensitive data is in environment variables
- ✅ `.env` files are in `.gitignore`
- ✅ JWT_SECRET is a strong, random string
- ✅ CORS is configured to only allow your frontend domain
- ✅ MongoDB connection string uses a strong password
- ✅ Email credentials use app-specific passwords (not your main password)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console for errors
3. Verify all environment variables are set correctly
4. Ensure both frontend and backend are deployed successfully
