/**
 * Menu Item model for MongoDB
 * Stores menu items for the restaurant
 * Schema: name, description, english, price, category, tag, available
 */

/**
 * Get MongoDB connection and collection
 */
async function getMenuCollection() {
  try {
    const { getDatabase } = await import('../mongodb.js');
    const db = await getDatabase();
    return db.collection('menuItems');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return null;
  }
}

/**
 * Get all menu items
 */
export async function getAllMenuItems() {
  const collection = await getMenuCollection();
  
  if (!collection) {
    return [];
  }
  
  try {
    const items = await collection.find({}).sort({ category: 1, name: 1 }).toArray();
    return items.map(formatMenuItem);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

/**
 * Get menu items by category
 */
export async function getMenuItemsByCategory(category) {
  const collection = await getMenuCollection();
  
  if (!collection) {
    return [];
  }
  
  try {
    const items = await collection.find({ category }).sort({ name: 1 }).toArray();
    return items.map(formatMenuItem);
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    return [];
  }
}

/**
 * Get single menu item by ID
 */
export async function getMenuItemById(id) {
  const collection = await getMenuCollection();
  
  if (!collection) {
    return null;
  }
  
  try {
    const { ObjectId } = await import('mongodb');
    let item;
    try {
      item = await collection.findOne({ _id: new ObjectId(id) });
    } catch {
      item = await collection.findOne({ _id: id });
    }
    return item ? formatMenuItem(item) : null;
  } catch (error) {
    console.error('Error fetching menu item:', error);
    return null;
  }
}

/**
 * Create new menu item
 */
export async function createMenuItem(data) {
  const collection = await getMenuCollection();
  
  if (!collection) {
    throw new Error('MongoDB not available');
  }
  
  const doc = {
    name: data.name,
    description: data.description || '',
    english: data.english || '',
    price: data.price,
    category: data.category,
    tag: data.tag || null,
    available: data.available !== false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  try {
    const result = await collection.insertOne(doc);
    return {
      id: result.insertedId.toString(),
      ...doc
    };
  } catch (error) {
    console.error('Error creating menu item:', error);
    throw new Error('Failed to create menu item');
  }
}

/**
 * Update menu item
 */
export async function updateMenuItem(id, data) {
  const collection = await getMenuCollection();
  
  if (!collection) {
    throw new Error('MongoDB not available');
  }
  
  try {
    const { ObjectId } = await import('mongodb');
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }
    
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );
    
    const result = await collection.updateOne(query, { $set: updateData });
    
    if (result.matchedCount === 0) {
      return null;
    }
    
    return await getMenuItemById(id);
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw new Error('Failed to update menu item');
  }
}

/**
 * Delete menu item
 */
export async function deleteMenuItem(id) {
  const collection = await getMenuCollection();
  
  if (!collection) {
    throw new Error('MongoDB not available');
  }
  
  try {
    const { ObjectId } = await import('mongodb');
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }
    
    const result = await collection.deleteOne(query);
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw new Error('Failed to delete menu item');
  }
}

/**
 * Get all unique categories
 */
export async function getAllCategories() {
  const collection = await getMenuCollection();
  
  if (!collection) {
    return [];
  }
  
  try {
    const categories = await collection.distinct('category');
    return categories.sort();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Format menu item for API response
 */
function formatMenuItem(item) {
  return {
    id: item._id.toString(),
    name: item.name,
    description: item.description || '',
    english: item.english || '',
    price: item.price,
    category: item.category,
    tag: item.tag || null,
    available: item.available,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  };
}
