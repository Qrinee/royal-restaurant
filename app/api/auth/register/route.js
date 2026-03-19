import { NextResponse } from 'next/server';
import { generateTokenAsync, COOKIE_NAME, getCookieOptions } from '@/lib/auth';
import { createUser, findUserByUsername } from '@/lib/models/user';

/**
 * Registration endpoint for admin user
 * Saves user to MongoDB
 */

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

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    const newUser = await createUser(username, password, 'admin');

    const token = await generateTokenAsync(newUser);

    const response = NextResponse.json({
      success: true,
      user: {
        username: newUser.username,
        role: newUser.role
      }
    });

    response.cookies.set(COOKIE_NAME, token, getCookieOptions());

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
