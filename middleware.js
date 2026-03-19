import { NextResponse } from 'next/server';
import { verifyTokenAsync, getTokenFromCookies, COOKIE_NAME } from './lib/auth-middleware';

// Define protected routes
const protectedPaths = [
  '/panel-admin-glowny',
  '/zarzadzanie-menu',
  '/zarzadzanie-galeria',
  '/zarzadzanie-wiadomosciami',
  '/ustawienia-systemu',
  '/api/admin',
];

// Define paths that should redirect to login if not authenticated
const authPaths = [
  '/logowanie-admin',
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes (except admin API)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public') ||
    (pathname.startsWith('/api') && !pathname.startsWith('/api/admin') && !pathname.startsWith('/api/auth'))
  ) {
    return NextResponse.next();
  }

  // Check if the path is a protected admin route
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.includes(pathname);

  // Get token from cookies
  const token = getTokenFromCookies(request.cookies);
  
  // Verify token asynchronously
  let isAuthenticated = false;
  if (token) {
    try {
      const decoded = verifyTokenAsync(token);
      isAuthenticated = !!decoded;
    } catch (e) {
      isAuthenticated = false;
    }
  }

  // If trying to access protected route without authentication
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL('/logowanie-admin', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated and trying to access login page, redirect to admin
  if (isAuthPath && isAuthenticated) {
    const adminUrl = new URL('/panel-admin-glowny', request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};
