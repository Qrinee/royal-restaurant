import { NextResponse } from 'next/server';
import { generateTokenAsync, COOKIE_NAME, getCookieOptions } from '@/lib/auth';
import { validateCredentials } from '@/lib/models/user';

// Simple in-memory rate limiting (resets on server restart)
// For production, use Redis or similar
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function getClientIP(request) {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  
  if (!attempts) {
    return { allowed: true };
  }
  
  // Check if still locked out
  if (attempts.lockedUntil && now < attempts.lockedUntil) {
    return { 
      allowed: false, 
      remainingTime: Math.ceil((attempts.lockedUntil - now) / 1000)
    };
  }
  
  // Reset if lockout expired
  if (attempts.lockedUntil && now >= attempts.lockedUntil) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }
  
  // Check attempt count
  if (attempts.count >= MAX_ATTEMPTS) {
    attempts.lockedUntil = now + LOCKOUT_DURATION;
    return { 
      allowed: false, 
      remainingTime: LOCKOUT_DURATION / 1000
    };
  }
  
  return { allowed: true };
}

function recordFailedAttempt(ip) {
  let attempts = loginAttempts.get(ip);
  
  if (!attempts) {
    attempts = { count: 0, lockedUntil: null };
  }
  
  attempts.count += 1;
  loginAttempts.set(ip, attempts);
}

function resetAttempts(ip) {
  loginAttempts.delete(ip);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    let user = null;
    try {
      user = await validateCredentials(username, password);
    } catch (e) {
      console.log('Auth error:', e.message);
    }

    if (!user) {
      const clientIP = getClientIP(request);
      recordFailedAttempt(clientIP);
      
      // Check if now locked out
      const rateCheck = checkRateLimit(clientIP);
      if (!rateCheck.allowed) {
        return NextResponse.json(
          { success: false, error: `Zbyt wiele prób logowania. Spróbuj ponownie za ${rateCheck.remainingTime} sekund` },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Reset failed attempts on successful login
    const clientIP = getClientIP(request);
    resetAttempts(clientIP);

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
