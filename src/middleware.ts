import { clerkMiddleware } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
export default clerkMiddleware();

// Only apply this middleware to relevant paths.
// The empty config object means to use the default configuration.
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
  ],
};