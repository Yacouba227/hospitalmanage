import { NextRequest, NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/dashboard', '/patients', '/records', '/appointments', '/prescriptions', '/users'];

export function middleware(request: NextRequest) {
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/')
  );

  // For server-side middleware, we can't access localStorage
  // We'll rely on client-side authentication for now
  // The middleware will only handle basic routing
  
  // If accessing login/register pages while authenticated, redirect to dashboard
  // Note: This is a simplified check - in production you'd use cookies/session
  const authHeader = request.headers.get('authorization');
  
  // For now, let all requests through to be handled by client-side auth
  // This prevents middleware conflicts with client-side authentication
  return NextResponse.next();
}

// Specify which routes the middleware should run for
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};