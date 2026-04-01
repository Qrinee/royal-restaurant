import { NextResponse } from 'next/server';
import { verifyTokenAsync, getTokenFromCookies } from '@/lib/auth';
import { getMenuItemById, updateMenuItem, deleteMenuItem } from '@/lib/models/menuItem';

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
 * GET /api/admin/menu/[id] - Get single menu item
 */
export async function GET(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const { id } = await params;
    console.log('GET: Looking for menu item with id:', id);
    const item = await getMenuItemById(id);
    
    if (!item) {
      console.log('GET: Item not found for id:', id);
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

export async function PUT(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const { id } = await params;
    console.log('PUT: Updating menu item with id:', id);
    const body = await request.json();
    console.log('PUT: Body:', body);
    
    const updatedItem = await updateMenuItem(id, body);
    
    if (!updatedItem) {
      console.log('PUT: Item not found for update with id:', id);
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

export async function DELETE(request, { params }) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const { id } = await params;
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
