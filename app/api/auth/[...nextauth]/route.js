import { NextResponse } from 'next/server';
import { generateToken, verifyToken, COOKIE_NAME, getCookieOptions, getClearCookieOptions } from '@/lib/auth';
import { validateCredentials } from '@/lib/models/user';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (action === 'session') {
    const token = verifyToken(request.cookies.get(COOKIE_NAME)?.value);
    
    if (!token) {
      return NextResponse.json({ status: 'unauthenticated' });
    }

    return NextResponse.json({
      status: 'authenticated',
      user: {
        username: token.username,
        role: token.role
      }
    });
  }

  return NextResponse.json({ status: 'ok' });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, username, password } = body;

    if (action === 'signin') {
      if (!username || !password) {
        return NextResponse.json(
          { error: 'Username and password are required' },
          { status: 400 }
        );
      }

      // Try MongoDB authentication first, then fallback to env-based auth
      // The validateCredentials function handles both MongoDB and env-based auth
      let user = null;
      try {
        user = await validateCredentials(username, password);
      } catch (e) {
        console.log('Auth error, trying env-based fallback:', e.message);
      }

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
      const token = generateToken(user);

      const response = NextResponse.json({
        ok: true,
        user: {
          name: user.username,
          role: user.role
        }
      });

      response.cookies.set(COOKIE_NAME, token, getCookieOptions());

      return response;
    }

    if (action === 'signout') {
      const response = NextResponse.json({ ok: true });
      response.cookies.set(COOKIE_NAME, '', getClearCookieOptions());
      return response;
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });

  } catch (error) {
    console.error('NextAuth route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
