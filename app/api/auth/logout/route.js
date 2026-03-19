import { NextResponse } from 'next/server';
import { COOKIE_NAME, getClearCookieOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    response.cookies.set(COOKIE_NAME, '', getClearCookieOptions());

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
