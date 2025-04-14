import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a matcher for routes that don't need authentication
const publicPaths = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/verify",
  "/api/auth(.*)",
];
const isPublic = createRouteMatcher(publicPaths);

// This example protects all routes including api/trpc routes
export default clerkMiddleware((auth, req) => {
  // If the route is public, don't enforce auth
  if (isPublic(req)) {
    return;
  }
  // Otherwise, continue with auth check
});

// Only apply this middleware to relevant paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};