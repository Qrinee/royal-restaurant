import { NextResponse } from 'next/server';
import { verifyTokenAsync, getTokenFromCookies } from '@/lib/auth';
import { getAllMenuItems, createMenuItem, getAllCategories } from '@/lib/models/menuItem';

/**
 * Verify admin session - returns error response if not authenticated
 */
async function verifyAdminSession(request) {
  const token = getTokenFromCookies(request.cookies);
  if (!token) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  
  const decoded = await verifyTokenAsync(token);
  if (!decoded) {
    return { error: NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 }) };
  }
  
  return { user: decoded };
}

/**
 * GET /api/admin/menu - Get all menu items
 * GET /api/admin/menu?category=... - Get menu items by category
 * GET /api/admin/menu?categories=true - Get all unique categories
 */
export async function GET(request) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const getCategories = searchParams.get('categories') === 'true';
    
    if (getCategories) {
      const categories = await getAllCategories();
      return NextResponse.json({ success: true, categories });
    }
    
    if (category) {
      const { getMenuItemsByCategory } = await import('@/lib/models/menuItem');
      const items = await getMenuItemsByCategory(category);
      return NextResponse.json({ success: true, items });
    }
    
    const items = await getAllMenuItems();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const body = await request.json();
    
    // Check for bulk insert
    if (body.items && Array.isArray(body.items)) {
      const results = [];
      for (const item of body.items) {
        const { name, description, english, price, category, tag } = item;
        if (!name || !price || !category) {
          results.push({ success: false, error: 'Name, price, and category are required', item });
          continue;
        }
        try {
          const newItem = await createMenuItem({
            name,
            description: description || '',
            english: english || '',
            price,
            category,
            tag: tag || null,
            available: item.available !== false
          });
          results.push({ success: true, item: newItem });
        } catch (err) {
          results.push({ success: false, error: err.message, item });
        }
      }
      return NextResponse.json({ success: true, results });
    }
    
    // Single item insert
    const { name, description, english, price, category, tag } = body;
    
    // Validate required fields
    if (!name || !price || !category) {
      return NextResponse.json(
        { success: false, error: 'Name, price, and category are required' },
        { status: 400 }
      );
    }
    
    const newItem = await createMenuItem({
      name,
      description: description || '',
      english: english || '',
      price,
      category,
      tag: tag || null,
      available: true
    });
    
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create menu item' },
      { status: 500 }
    );
  }
}
