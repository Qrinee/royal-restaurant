import crypto from 'crypto';

// Get JWT_SECRET from environment, throw error if not set in production
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    // In production, require JWT_SECRET to be set
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is required in production');
    }
    // In development, use a warning but allow fallback (not recommended for production)
    console.warn('WARNING: JWT_SECRET not set. Using insecure default. Set JWT_SECRET in .env.local');
    return 'dev-only-insecure-secret-do-not-use-in-production';
  }
  
  return secret;
}

const JWT_SECRET = getJwtSecret();
const JWT_EXPIRES_IN = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const COOKIE_NAME = 'admin-session';

// Base64url encoding/decoding (compatible with middleware)
function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

/**
 * Generate JWT-like token (async version - compatible with middleware)
 */
export async function generateTokenAsync(user) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(JSON.stringify({
    username: user.username,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + JWT_EXPIRES_IN
  }));
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');
  
  return `${header}.${payload}.${signature}`;
}

/**
 * Verify JWT-like token (async version - compatible with middleware)
 */
export async function verifyTokenAsync(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [header, payload, signature] = parts;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');
    
    // Verify signature using timing-safe comparison
    const sigBuffer = Buffer.from(signature, 'base64url');
    const expectedBuffer = Buffer.from(expectedSignature, 'base64url');
    
    // Use timing-safe comparison to prevent timing attacks
    if (sigBuffer.length !== expectedBuffer.length || 
        !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null;
    }
    
    // Parse payload
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
    
    // Check expiration
    if (decoded.exp && Date.now() > decoded.exp) return null;
    
    return decoded;
  } catch (error) {
    return null;
  }
}

// Sync versions for backward compatibility
export function generateToken(user) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    username: user.username,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + JWT_EXPIRES_IN
  })).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');
  
  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [header, payload, signature] = parts;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');
    
    // Verify signature using timing-safe comparison
    const sigBuffer = Buffer.from(signature, 'base64url');
    const expectedBuffer = Buffer.from(expectedSignature, 'base64url');
    
    // Use timing-safe comparison to prevent timing attacks
    if (sigBuffer.length !== expectedBuffer.length || 
        !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null;
    }
    
    // Parse payload
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
    
    // Check expiration
    if (decoded.exp && Date.now() > decoded.exp) return null;
    
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from request cookies
 */
export function getTokenFromCookies(cookies) {
  const cookie = cookies?.get(COOKIE_NAME);
  return cookie?.value || null;
}

/**
 * Create cookie options
 */
export function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: JWT_EXPIRES_IN / 1000,
    path: '/'
  };
}

/**
 * Clear session cookie
 */
export function getClearCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  };
}

export { JWT_SECRET, COOKIE_NAME, JWT_EXPIRES_IN };
