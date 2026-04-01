import { NextResponse } from 'next/server';
import { getContentByType, getSingleContent } from '@/lib/models/siteContent';

/**
 * GET /api/site-content - Get site content (public, read-only)
 * GET /api/site-content?type=hero - Get content by type
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type parameter is required' },
        { status: 400 }
      );
    }
    
    // Single types (only one item)
    const singleTypes = ['hero', 'about', 'settings', 'footer'];
    if (singleTypes.includes(type)) {
      const content = await getSingleContent(type);
      return NextResponse.json({ success: true, content });
    }
    
    // Multiple types (events, etc.)
    const items = await getContentByType(type);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Error fetching site content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
