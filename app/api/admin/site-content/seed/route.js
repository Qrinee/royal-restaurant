import { NextResponse } from 'next/server';
import { verifyTokenAsync, getTokenFromCookies } from '@/lib/auth';
import { upsertSiteContent } from '@/lib/models/siteContent';

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
 * POST /api/admin/site-content/seed - Seed default content
 * Populates the database with existing site content
 * REQUIRES ADMIN AUTHENTICATION
 */
export async function POST(request) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const defaultContent = [
      {
        type: 'hero',
        badge: 'ROYAL RESTAURANT',
        title: 'Miejsce codziennych',
        subtitle: 'spotkań przy polskim stole',
        description: 'Czekamy na Was od poniedziałku do piątku od 12:00 do 22:00, a w weekendowe poranki zapraszamy już od 9:00 na spokojne śniadania',
        ctaText: 'ZOBACZ MENU',
        ctaLink: '/menu',
        ctaText2: 'ZAREZERWUJ',
        ctaLink2: 'https://dineout.pl/en/restaurants/27968bce8-volla-bar-restaurant-leonardo-royal-hotel-warsaw',
        image1: '/680A9843-Edit.webp',
        image2: '/20260309_1554_Image Generation_remix_01kk9her3sfy686518tepp89zj.webp'
      },
      {
        type: 'about',
        title: 'O Nas',
        subtitle: 'NASZA HISTORIA',
        description: 'Royal Restaurant to miejsce, gdzie tradycyjna polska kuchnia spotyka się z nowoczesnym podejściem do gastronomii. Nasze dania przygotowywane są z najwyższej jakości lokalnych składników, a każda potrawa opowiada historię polskiego stołu.',
        image1: '/680A9843-Edit.webp'
      },
      {
        type: 'events',
        title: 'Nasze wydarzenia',
        subtitle: 'EVENTY',
        description: 'W Royal Restaurant organizujemy wyjątkowe wydarzenia kulinarne, spotkania biznesowe i rodzinne przyjęcia. Nasz profesjonalny zespół zadba o każdy detal Twojego wydarzenia.',
        ctaText: 'POBIERZ OFERTĘ SPOTKAŃ',
        ctaLink: '#',
        ctaText2: 'POBIERZ OFERTĘ EVENTÓW',
        ctaLink2: '#'
      },
      {
        type: 'instagram',
        image1: '/ig/1.webp',
        link1: '',
        image2: '/ig/2.webp',
        link2: ''
      },
      {
        type: 'settings',
        restaurantName: 'Royal Restaurant',
        address: 'ul. Generała Zajączka 12, 05-270 Marki',
        phone: '+48 22 123 45 67',
        email: 'kontakt@royalrestaurant.pl',
        instagram: 'https://instagram.com/royalrestaurant',
        facebook: 'https://facebook.com/royalrestaurant',
        description: '© 2024 Royal Restaurant. Wszystkie prawa zastrzeżone.'
      },
      {
        type: 'footer',
        description: '© 2024 Royal Restaurant. Wszystkie prawa zastrzeżone.'
      }
    ];

    const results = [];
    for (const content of defaultContent) {
      const result = await upsertSiteContent(content.type, content);
      results.push({ type: content.type, success: result.success });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Zaszczepiono ${results.filter(r => r.success).length} z ${results.length} elementów`,
      results 
    });
  } catch (error) {
    console.error('Error seeding content:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}