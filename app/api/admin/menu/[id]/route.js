import { NextResponse } from 'next/server';
import { getMenuItemById, updateMenuItem, deleteMenuItem } from '@/lib/models/menuItem';

/**
 * GET /api/admin/menu/[id] - Get single menu item
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const item = await getMenuItemById(id);
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu item' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/menu/[id] - Update menu item
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const updatedItem = await updateMenuItem(id, body);
    
    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/menu/[id] - Delete menu item
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await deleteMenuItem(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}
