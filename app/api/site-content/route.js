import { NextResponse } from 'next/server';
import { getContentByType, getSingleContent } from '@/lib/models/siteContent';

/**
 * GET /api/site-content - Get site content (public, read-only)
 * GET /api/site-content?type=hero - Get content by type
 * GET /api/site-content?type=hero&lang=en - Get content in specific language
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const lang = searchParams.get('lang') || 'pl';
    
    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type parameter is required' },
        { status: 400 }
      );
    }
    
    // Single types (only one item)
    const singleTypes = ['hero', 'about', 'settings', 'footer'];
    if (singleTypes.includes(type)) {
      const content = await getSingleContent(type, lang);
      return NextResponse.json(
        { success: true, content },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }
      );
    }
    
    // Multiple types (events, instagram, etc.)
    const items = await getContentByType(type, lang);
    return NextResponse.json(
      { success: true, items },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
  } catch (error) {
    console.error('Error fetching site content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
