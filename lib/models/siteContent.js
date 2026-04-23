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
    lang: item.lang || 'pl',
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
    image3: item.image3 || '',
    image4: item.image4 || '',
    link: item.link || '',
    link1: item.link1 || '',
    link2: item.link2 || '',
    date: item.date ? item.date.toISOString() : null,
    featured: item.featured || false,
    order: item.order || 0,
    restaurantName: item.restaurantName || '',
    address: item.address || '',
    city: item.city || '',
    phone: item.phone || '',
    email: item.email || '',
    openingHours: item.openingHours || [],
    socialLinks: item.socialLinks || { instagram: '', facebook: '' },
    logo: item.logo || '',
    description: item.description || '',
    badge: item.badge || '',
    suffix: item.suffix || '',
    sectionTitle: item.sectionTitle || '',
    openingHoursTitle: item.openingHoursTitle || '',
    mondayFriday: item.mondayFriday || '',
    saturday: item.saturday || '',
    sunday: item.sunday || '',
    orderOnline: item.orderOnline || '',
    orderPyszne: item.orderPyszne || '',
    orderSubtext: item.orderSubtext || '',
    contact: item.contact || '',
    updatedAt: item.updatedAt?.toISOString() || null
  };
}

/**
 * Get all content by type (optionally filter by language)
 */
export async function getContentByType(type, lang = null) {
  const collection = await getSiteContentCollection();
  if (!collection) return [];
  
  try {
    const query = { type };
    if (lang) query.lang = lang;
    const items = await collection.find(query).sort({ order: 1 }).toArray();
    return items.map(formatSiteContent);
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    return [];
  }
}

/**
 * Get single content by type (for sections that have only one item)
 * Optionally filter by language (default: 'pl')
 */
export async function getSingleContent(type, lang = 'pl') {
  const collection = await getSiteContentCollection();
  if (!collection) return null;
  
  try {
    const item = await collection.findOne({ type, lang });
    if (!item) {
      // Fallback to Polish if specific language not found
      if (lang !== 'pl') {
        const fallback = await collection.findOne({ type, lang: 'pl' });
        if (fallback) return formatSiteContent(fallback);
      }
      return null;
    }
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
 * Upsert content (create or update by type and language)
 */
export async function upsertSiteContent(type, data) {
  const collection = await getSiteContentCollection();
  if (!collection) return { success: false };
  
  try {
    const { lang } = data;
    const query = { type };
    if (lang) query.lang = lang;
    
    const existing = await collection.findOne(query);
    
    if (existing) {
      const result = await collection.updateOne(
        query,
        { $set: { ...data, updatedAt: new Date() } }
      );
      return { success: result.modifiedCount > 0 || result.matchedCount > 0 };
    } else {
      const doc = {
        type,
        lang: lang || 'pl',
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

/**
 * Update image for all languages (for sections that share images)
 */
export async function updateImageForAllLangs(type, imageField, imageUrl) {
  const collection = await getSiteContentCollection();
  if (!collection) return { success: false };
  
  try {
    const updateDoc = { $set: { [imageField]: imageUrl, updatedAt: new Date() } };
    const result = await collection.updateMany(
      { type },
      updateDoc
    );
    return { success: result.modifiedCount > 0 || result.matchedCount > 0 };
  } catch (error) {
    console.error('Error updating image for all langs:', error);
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