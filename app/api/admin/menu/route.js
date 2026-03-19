import { NextResponse } from 'next/server';
import { getAllMenuItems, createMenuItem, getAllCategories } from '@/lib/models/menuItem';

/**
 * GET /api/admin/menu - Get all menu items
 * GET /api/admin/menu?category=... - Get menu items by category
 * GET /api/admin/menu?categories=true - Get all unique categories
 */
export async function GET(request) {
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

/**
 * POST /api/admin/menu - Create new menu item
 */
export async function POST(request) {
  try {
    const body = await request.json();
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
