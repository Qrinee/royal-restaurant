import { NextResponse } from 'next/server';
import { generateTokenAsync, COOKIE_NAME, getCookieOptions } from '@/lib/auth';
import { validateCredentials } from '@/lib/models/user';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Try MongoDB authentication first, then fallback to env-based auth
    let user = null;
    try {
      user = await validateCredentials(username, password);
    } catch (e) {
      console.log('Auth error:', e.message);
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate JWT token (async version for compatibility)
    const token = await generateTokenAsync(user);

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        username: user.username,
        role: user.role
      }
    });

    // Set HTTP-only cookie
    response.cookies.set(COOKIE_NAME, token, getCookieOptions());

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
