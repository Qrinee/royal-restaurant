import { NextResponse } from 'next/server';
import { getAllMenuItems, getMenuItemsByCategory, getAllCategories } from '@/lib/models/menuItem';

/**
 * GET /api/menu - Get all menu items (public endpoint)
 * GET /api/menu?category=... - Get menu items by category
 * GET /api/menu?categories=true - Get all unique categories
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