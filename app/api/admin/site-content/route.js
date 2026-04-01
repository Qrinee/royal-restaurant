import { NextResponse } from 'next/server';
import { verifyTokenAsync, getTokenFromCookies } from '@/lib/auth';
import { getAllSiteContent, getContentByType, getSingleContent, createSiteContent, updateSiteContent, deleteSiteContent, upsertSiteContent } from '@/lib/models/siteContent';

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
 * GET /api/admin/site-content - Get all content or by type
 * GET /api/admin/site-content?type=hero - Get content by type
 */
export async function GET(request) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    if (type) {
      // For types that should have only one item (hero, about, settings, footer)
      const singleTypes = ['hero', 'about', 'settings', 'footer'];
      if (singleTypes.includes(type)) {
        const content = await getSingleContent(type);
        return NextResponse.json({ success: true, content });
      }
      // For types with multiple items (events)
      const items = await getContentByType(type);
      return NextResponse.json({ success: true, items });
    }
    
    const allContent = await getAllSiteContent();
    return NextResponse.json({ success: true, items: allContent });
  } catch (error) {
    console.error('Error fetching site content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const { searchParams } = new URL(request.url);
    const upsert = searchParams.get('upsert') === 'true';
    const body = await request.json();
    const { type, ...data } = body;
    
    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type is required' },
        { status: 400 }
      );
    }
    
    if (upsert) {
      // For single-item types (hero, about, settings, footer)
      const result = await upsertSiteContent(type, data);
      return NextResponse.json(result);
    }
    
    const result = await createSiteContent({ type, ...data });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create content' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const result = await updateSiteContent(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update content' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const result = await deleteSiteContent(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete content' },
      { status: 500 }
    );
  }
}