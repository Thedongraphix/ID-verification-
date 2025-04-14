# KEWI ID System Deployment Guide

## Environment Variables

Your system only needs one set of environment variables in the `.env.local` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

These variables work for both development and production.

## Deployment Steps

1. Make sure your Clerk application has your production domain added in the Clerk dashboard
2. Build your application:
   ```
   npm run build
   ```
3. Deploy according to your hosting platform (Vercel, Netlify, etc.)
4. Set the environment variables in your hosting platform with the same values

## Troubleshooting Production Issues

If you encounter authentication issues in production:

1. Check that your Clerk application has your production domain added
2. Verify that all environment variables are set correctly in your hosting platform
3. Ensure the middleware.ts file at the root of your project is deployed
4. Clear browser cache and cookies if you experience persistent issues 