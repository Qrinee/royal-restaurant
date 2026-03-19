// Auth functions for middleware (Edge Runtime compatible)
// Uses Web Crypto API instead of Node.js crypto

const COOKIE_NAME = 'admin-session';

// Simple base64url encoding/decoding (Edge Runtime compatible)
function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

// Simple HMAC-SHA256 using SubtleCrypto (Edge Runtime compatible)
async function signHMAC(secret, data) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

async function verifyHMAC(secret, data, signature) {
  try {
    const expected = await signHMAC(secret, data);
    // Simple timing-safe comparison
    if (expected.length !== signature.length) return false;
    let result = 0;
    for (let i = 0; i < expected.length; i++) {
      result |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return result === 0;
  } catch {
    return false;
  }
}

// Get JWT_SECRET from environment - for middleware we need to handle this carefully
function getJwtSecret() {
  // In Edge Runtime, we can't access process.env the same way
  // Use a fallback that will work if the cookie was created with the same secret
  // The actual verification will fail if secrets don't match
  return typeof process !== 'undefined' 
    ? (process.env.JWT_SECRET || 'dev-secret') 
    : 'dev-secret';
}

/**
 * Generate JWT-like token (async - for API routes)
 */
export async function generateTokenAsync(user) {
  const JWT_SECRET = getJwtSecret();
  const JWT_EXPIRES_IN = 24 * 60 * 60 * 1000;
  
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(JSON.stringify({
    username: user.username,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + JWT_EXPIRES_IN
  }));
  
  const signature = await signHMAC(JWT_SECRET, `${header}.${payload}`);
  
  return `${header}.${payload}.${signature}`;
}

/**
 * Verify JWT-like token (async - for middleware and API routes)
 */
export async function verifyTokenAsync(token) {
  const JWT_SECRET = getJwtSecret();
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [header, payload, signature] = parts;
    
    // Verify signature
    const isValid = await verifyHMAC(JWT_SECRET, `${header}.${payload}`, signature);
    if (!isValid) return null;
    
    // Parse payload
    const decoded = JSON.parse(base64UrlDecode(payload));
    
    // Check expiration
    if (decoded.exp && Date.now() > decoded.exp) return null;
    
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from cookies (synchronous)
 */
export function getTokenFromCookies(cookies) {
  const cookie = cookies?.get(COOKIE_NAME);
  return cookie?.value || null;
}

export { COOKIE_NAME };
