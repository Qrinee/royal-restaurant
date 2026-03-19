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

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check password minimum length
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user in MongoDB
    const newUser = await createUser(username, password, 'admin');

    // Generate JWT token (async version for compatibility)
    const token = await generateTokenAsync(newUser);

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        username: newUser.username,
        role: newUser.role
      }
    });

    // Set HTTP-only cookie
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
