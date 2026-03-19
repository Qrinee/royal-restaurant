import { NextResponse } from 'next/server';
import { verifyTokenAsync, getTokenFromCookies, COOKIE_NAME } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = getTokenFromCookies(request.cookies);

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No session found' },
        { status: 401 }
      );
    }

    const decoded = await verifyTokenAsync(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      username: decoded.username,
      role: decoded.role
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
