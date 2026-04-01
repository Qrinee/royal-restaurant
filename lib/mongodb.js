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
    console.log('tryConnect: MongoClient imported successfully');
    
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/royal-restaurant';
    console.log('tryConnect: URI =', uri);
    
    // Force fresh connection every time in development
    const options = {};
    const client = new MongoClient(uri, options);
    console.log('tryConnect: Created new MongoClient');
    
    const connectedClient = await client.connect();
    console.log('tryConnect: Connected successfully!');
    
    // Test the connection
    const adminDb = connectedClient.db('admin');
    await adminDb.command({ ping: 1 });
    console.log('tryConnect: Ping successful');
    
    return connectedClient;
  } catch (error) {
    console.error('tryConnect: Error connecting to MongoDB:', error.message);
    console.error('tryConnect: Full error:', error);
    return null;
  }
}

// Initialize connection on module load (don't await - lazy initialization)
// Use .then() and .catch() to properly handle both success and failure
clientPromise = tryConnect().then(client => {
  console.log('mongodb.js: Connection resolved');
  return client;
}).catch(err => {
  console.error('mongodb.js: Connection rejected:', err.message);
  return null;
});

console.log('mongodb.js: clientPromise initialized');

export async function getDatabase() {
  console.log('getDatabase: Getting database...');
  
  // Wait for client promise to resolve
  const client = await clientPromise;
  console.log('getDatabase: client =', client);
  
  if (!client) {
    console.log('getDatabase: No client, throwing error');
    throw new Error('MongoDB not available');
  }
  
  const db = client.db(process.env.MONGODB_DB || 'royal-restaurant');
  console.log('getDatabase: db =', db.databaseName);
  return db;
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

export default clientPromise;
