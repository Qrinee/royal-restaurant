import crypto from 'crypto';
import bcrypt from 'bcrypt';

const BCRYPT_ROUNDS = 12;

/**
 * User model for MongoDB
 * Stores admin user credentials
 * Works with or without MongoDB - falls back to env-based auth
 */
export class User {
  constructor(username, passwordHash, role = 'admin') {
    this.username = username;
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = new Date();
    this.lastLogin = null;
  }

  /**
   * Create a new user with hashed password
   * Uses bcrypt for secure password hashing
   */
  static async create(username, plainPassword, role = 'admin') {
    const passwordHash = await bcrypt.hash(plainPassword, BCRYPT_ROUNDS);
    return new User(username, passwordHash, role);
  }

  /**
   * Verify password against stored hash
   * Uses bcrypt for secure comparison
   */
  static async verifyPassword(plainPassword, storedHash) {
    try {
      return await bcrypt.compare(plainPassword, storedHash);
    } catch {
      // Fallback for legacy SHA-256 hashes (for migration only)
      const inputHash = crypto
        .createHash('sha256')
        .update(plainPassword)
        .digest('hex');
      return inputHash === storedHash;
    }
  }

  /**
   * Convert to plain object for MongoDB
   */
  toObject() {
    return {
      username: this.username,
      passwordHash: this.passwordHash,
      role: this.role,
      createdAt: this.createdAt,
      lastLogin: this.lastLogin
    };
  }

  /**
   * Convert to JSON for API response (excludes password)
   */
  toJSON() {
    return {
      username: this.username,
      role: this.role,
      createdAt: this.createdAt,
      lastLogin: this.lastLogin
    };
  }
}

/**
 * Get MongoDB connection (optional dependency)
 */
async function getMongoDB() {
  try {
    const { getUsersCollection } = await import('../mongodb.js');
    return { collection: await getUsersCollection(), available: true };
  } catch (error) {
    return { collection: null, available: false };
  }
}

/**
 * Find user by username in database
 */
export async function findUserByUsername(username) {
  const { collection, available } = await getMongoDB();
  
  if (!available || !collection) {
    return null;
  }
  
  try {
    return await collection.findOne({ username });
  } catch (error) {
    console.error('MongoDB query error:', error);
    return null;
  }
}

/**
 * Create a new user in database
 */
export async function createUser(username, password, role = 'admin') {
  const { collection, available } = await getMongoDB();
  
  if (!available || !collection) {
    throw new Error('MongoDB not available');
  }
  
  // Check if user already exists
  const existingUser = await collection.findOne({ username });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await User.create(username, password, role);
  await collection.insertOne(user.toObject());
  
  return user.toJSON();
}

/**
 * Validate user credentials
 * Tries MongoDB first (if available), falls back to env-based auth
 */
export async function validateCredentials(username, password) {
  // Try MongoDB first (if available and configured)
  try {
    const { collection, available } = await getMongoDB();
    
    if (available && collection) {
      const user = await collection.findOne({ username });
      
      if (user) {
        if (await User.verifyPassword(password, user.passwordHash)) {
          // Update last login
          await collection.updateOne(
            { username },
            { $set: { lastLogin: new Date() } }
          );
          
          return new User(user.username, user.passwordHash, user.role);
        }
        // User found but wrong password - don't try fallback
        return null;
      }
      // User not found in MongoDB - continue to env fallback
    }
  } catch (error) {
    console.error('MongoDB auth error:', error.message);
    // Fall through to env-based auth
  }

  // Fallback to environment-based authentication
  // ADMIN_USERNAME and ADMIN_PASSWORD_HASH must both be set
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  
  // Both must be set for env-based auth to work
  if (!adminUsername || !adminPasswordHash) {
    console.warn('Environment-based auth not configured: ADMIN_USERNAME or ADMIN_PASSWORD_HASH missing');
    return null;
  }

  if (username === adminUsername) {
    // Use bcrypt comparison for env hash
    try {
      const isValid = await bcrypt.compare(password, adminPasswordHash);
      if (isValid) {
        return { username: adminUsername, role: 'admin' };
      }
    } catch {
      // If env hash is not bcrypt format, try legacy SHA-256 comparison
      const inputHash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
      
      if (inputHash === adminPasswordHash) {
        return { username: adminUsername, role: 'admin' };
      }
    }
  }

  return null;
}

/**
 * Initialize default admin user if not exists
 * Only works when MongoDB is available
 * NOTE: No default password - must be set via ADMIN_DEFAULT_PASSWORD env var
 */
export async function initializeDefaultAdmin() {
  const { collection, available } = await getMongoDB();
  
  if (!available || !collection) {
    console.log('MongoDB not available, skipping admin initialization');
    return;
  }
  
  const adminExists = await collection.findOne({ username: 'admin' });
  
  if (!adminExists) {
    // Check if default password is configured
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD;
    
    if (!defaultPassword) {
      console.warn('ADMIN_DEFAULT_PASSWORD not set - skipping default admin creation');
      return;
    }
    
    // Create admin with configured password
    const user = await User.create('admin', defaultPassword, 'admin');
    await collection.insertOne(user.toObject());
    console.log('Default admin user created in MongoDB');
  }
}
