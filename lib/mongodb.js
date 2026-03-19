/**
 * MongoDB connection utility
 * Works with or without the mongodb package
 * Falls back gracefully when MongoDB is not available
 */

let clientPromise = null;

/**
 * Try to get MongoDB client, return null if not available
 */
async function tryConnect() {
  try {
    const { MongoClient } = await import('mongodb');
    
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/royal-restaurant';
    const options = {};
    
    let client;
    
    if (process.env.NODE_ENV === 'development') {
      // In development, use a global variable to preserve the connection
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      return global._mongoClientPromise;
    } else {
      // In production, create a new connection
      client = new MongoClient(uri, options);
      return client.connect();
    }
  } catch (error) {
    console.log('MongoDB not available:', error.message);
    return null;
  }
}

// Initialize connection on module load (don't await - lazy initialization)
try {
  clientPromise = tryConnect();
} catch (error) {
  console.log('MongoDB package not available');
  clientPromise = Promise.resolve(null);
}

export default clientPromise;

export async function getDatabase() {
  const client = await clientPromise;
  if (!client) {
    throw new Error('MongoDB not available');
  }
  return client.db(process.env.MONGODB_DB || 'royal-restaurant');
}

export async function getUsersCollection() {
  const db = await getDatabase();
  return db.collection('users');
}

/**
 * Check if MongoDB is available
 */
export async function isMongoDBAvailable() {
  try {
    const client = await clientPromise;
    return client !== null;
  } catch {
    return false;
  }
}
