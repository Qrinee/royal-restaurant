/**
 * Site Content Model for MongoDB
 * Stores editable content for the website (Hero, About, Events, Footer, Settings)
 */

async function getSiteContentCollection() {
  try {
    const { getDatabase } = await import('../mongodb.js');
    const db = await getDatabase();
    return db.collection('siteContent');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return null;
  }
}

function formatSiteContent(item) {
  if (!item) return null;
  return {
    id: item._id?.toString(),
    type: item.type,
    title: item.title || '',
    subtitle: item.subtitle || '',
    description: item.description || '',
    ctaText: item.ctaText || '',
    ctaLink: item.ctaLink || '',
    ctaText2: item.ctaText2 || '',
    ctaLink2: item.ctaLink2 || '',
    backgroundImage: item.backgroundImage || '',
    features: item.features || [],
    image: item.image || '',
    image1: item.image1 || '',
    image2: item.image2 || '',
    date: item.date ? item.date.toISOString() : null,
    featured: item.featured || false,
    link: item.link || '',
    order: item.order || 0,
    restaurantName: item.restaurantName || '',
    address: item.address || '',
    phone: item.phone || '',
    email: item.email || '',
    openingHours: item.openingHours || [],
    socialLinks: item.socialLinks || { instagram: '', facebook: '' },
    logo: item.logo || '',
    description: item.description || '',
    updatedAt: item.updatedAt?.toISOString() || null
  };
}

/**
 * Get all content by type
 */
export async function getContentByType(type) {
  const collection = await getSiteContentCollection();
  if (!collection) return [];
  
  try {
    const items = await collection.find({ type }).sort({ order: 1 }).toArray();
    return items.map(formatSiteContent);
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    return [];
  }
}

/**
 * Get single content by type (for sections that have only one item)
 */
export async function getSingleContent(type) {
  const collection = await getSiteContentCollection();
  if (!collection) return null;
  
  try {
    const item = await collection.findOne({ type });
    return formatSiteContent(item);
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    return null;
  }
}

/**
 * Get all content
 */
export async function getAllSiteContent() {
  const collection = await getSiteContentCollection();
  if (!collection) return [];
  
  try {
    const items = await collection.find({}).toArray();
    return items.map(formatSiteContent);
  } catch (error) {
    console.error('Error fetching site content:', error);
    return [];
  }
}

/**
 * Create new content
 */
export async function createSiteContent(data) {
  const collection = await getSiteContentCollection();
  if (!collection) return null;
  
  try {
    const doc = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await collection.insertOne(doc);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Error creating content:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update content by ID
 */
export async function updateSiteContent(id, data) {
  const collection = await getSiteContentCollection();
  if (!collection) return { success: false };
  
  try {
    const { ObjectId } = await import('mongodb');
    const objectId = new ObjectId(id);
    
    const updateDoc = {
      $set: {
        ...data,
        updatedAt: new Date()
      }
    };
    
    const result = await collection.updateOne({ _id: objectId }, updateDoc);
    return { success: result.modifiedCount > 0 };
  } catch (error) {
    console.error('Error updating content:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete content by ID
 */
export async function deleteSiteContent(id) {
  const collection = await getSiteContentCollection();
  if (!collection) return { success: false };
  
  try {
    const { ObjectId } = await import('mongodb');
    const objectId = new ObjectId(id);
    
    const result = await collection.deleteOne({ _id: objectId });
    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error('Error deleting content:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Upsert content (create or update by type)
 */
export async function upsertSiteContent(type, data) {
  const collection = await getSiteContentCollection();
  if (!collection) return { success: false };
  
  try {
    const existing = await collection.findOne({ type });
    
    if (existing) {
      const result = await collection.updateOne(
        { type },
        { $set: { ...data, updatedAt: new Date() } }
      );
      return { success: result.modifiedCount > 0 || result.matchedCount > 0 };
    } else {
      const doc = {
        type,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = await collection.insertOne(doc);
      return { success: true, id: result.insertedId };
    }
  } catch (error) {
    console.error('Error upserting content:', error);
    return { success: false, error: error.message };
  }
}

// Content types
export const CONTENT_TYPES = {
  HERO: 'hero',
  ABOUT: 'about',
  EVENT: 'event',
  SETTINGS: 'settings',
  FOOTER: 'footer'
};