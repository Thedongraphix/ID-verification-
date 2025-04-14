import { clerkMiddleware } from "@clerk/nextjs/server";

// This middleware handles authentication protection for all routes
export default clerkMiddleware();

// Simple matcher that works for both development and production
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/'
  ],
}; 