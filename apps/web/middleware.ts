// middleware.ts
import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: [
    '/', 
    '/sign-in', 
    '/sign-up',
    '/vendors',
    '/vendors/:path*',
    '/checklist',
    '/messages',
    '/tribute',
    '/reviews',
  ],
});

export const config = {
  matcher: [
    '/dashboard(.*)',       // ✅ This line adds protection to /dashboard and nested routes
    '/checklist/edit',
    '/messages/send',
    '/tribute/create',
    '/reviews/submit',
  ],
};
