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
 * Populates the database with existing site content in both Polish and English
 * REQUIRES ADMIN AUTHENTICATION
 */
export async function POST(request) {
  const auth = await verifyAdminSession(request);
  if (auth.error) return auth.error;
  
  try {
    const defaultContent = [
       {
         type: 'hero',
         lang: 'pl',
         badge: 'ROYAL RESTAURANT',
         title: 'Miejsce codziennych',
         subtitle: 'spotkań',
         suffix: 'przy polskim stole',
         description: 'Czekamy na Was od poniedziałku do piątku od 12:00 do 22:00, a w weekendowe poranki zapraszamy już od 9:00 na spokojne śniadania',
         ctaText: 'ZOBACZ MENU',
         ctaLink: '/menu',
         ctaText2: 'ZAREZERWUJ',
         image1: '/680A9843-Edit.webp',
         image2: '/20260309_1554_Image Generation_remix_01kk9her3sfy686518tepp89zj.webp',
         image3: '/ig/2.webp',
         image4: '/ig/3.webp'
       },
       {
         type: 'hero',
         lang: 'en',
         badge: 'ROYAL RESTAURANT',
         title: 'A place for everyday',
         subtitle: 'gatherings',
         suffix: 'at the Polish table',
         description: "We're waiting for you from Monday to Friday from 12:00 to 22:00, and on weekend mornings we invite you from 9:00 for a relaxed breakfast",
         ctaText: 'SEE THE MENU',
         ctaLink: '/menu',
         ctaText2: 'MAKE A RESERVATION',
         image1: '/680A9843-Edit.webp',
         image2: '/20260309_1554_Image Generation_remix_01kk9her3sfy686518tepp89zj.webp',
         image3: '/ig/2.webp',
         image4: '/ig/3.webp'
       },
      {
        type: 'about',
        lang: 'pl',
        title: 'O NAS',
        sectionTitle: 'poznaj nas',
        description: 'W Royal Restaurant lubimy, kiedy przy stole dzieje się życie. Kiedy rozmowy płyną swobodnie, a dania krążą między Gośćmi. Kiedy ktoś mówi „weź spróbuj" i przesuwa talerz bliżej środka. Lubimy momenty, w których nikt się nie spieszy. Kiedy szybki obiad zamienia się w długie spotkanie, a kolacja w fascynujący wieczór, który chce się przedłużać bez końca.\n\nLubimy tradycyjne polskie smaki, które wszyscy dobrze znamy - takie, do których wraca się z przyjemnością i które najlepiej smakują razem. Dlatego nasze stoły często wypełniają się dokładkami zamawianymi pod hasłem „jeszcze raz dla wszystkich".\n\nCieszy nas stukot sztućców, rozmowy ponad talerzami i cisza, która zapada, kiedy jedzenie naprawdę smakuje. Bo Royal Restaurant to miejsce, w którym najważniejsze jest wspólne bycie przy stole - swobodnie, serdecznie i po polsku.',
        image1: '/680A0006.webp'
      },
      {
        type: 'about',
        lang: 'en',
        title: 'ABOUT US',
        sectionTitle: 'get to know us',
        description: 'At Royal Restaurant, we love when life happens around the table. When conversations flow freely and dishes are shared among guests. When someone says "try this" and moves the plate closer to the center. We love those moments when no one is in a hurry - when a quick lunch turns into a long gathering, and dinner becomes a captivating evening you don\'t want to end.\n\nWe love traditional Polish flavors that everyone knows well - those you happily come back to and that taste best when shared. That\'s why our tables are often filled with extra portions ordered under the motto "one more for everyone."\n\nWe enjoy the clatter of cutlery, conversations over plates, and the silence that falls when the food truly delights. Because Royal Restaurant is a place where what matters most is being together at the table - casually, warmly, and in the Polish way.',
        image1: '/680A0006.webp'
      },
      {
        type: 'events',
        lang: 'pl',
        title: 'EVENTY',
        sectionTitle: 'Celebruj z nami',
        description: 'W Royal Restaurant lubimy świętować razem z Gośćmi. Lubimy stoły, przy których zbiera się rodzina, przyjaciele albo współpracownicy i kiedy pojawiają się toasty i śmiech.\n\nOrganizujemy spotkania biznesowe i przyjęcia rodzinne, które mają być po prostu miłe i bez pośpiechu. Można u nas zarezerwować część sali albo całą restaurację na zamknięte wydarzenie - tak, żeby mieć przestrzeń tylko dla siebie i Gości.\n\nMamy własną cukiernię, więc torty i słodkości przygotowujemy od podstaw i według ustaleń - takie, jakie pasują do okazji i osób, które świętują.\n\nLubimy też wieczory, które łączą w sobie teatr i naszą kuchnię. Jesteśmy tuż obok Teatru Kwadrat, więc wielu Gości łączy spektakl z późniejszym spotkaniem przy stole - na wieczorną ucztę, deser lub lampkę wina po przedstawieniu.\n\nJeśli planujecie większe wydarzenie, istnieje także możliwość organizacji przyjęcia w przestrzeniach teatru z obsługą naszego cateringu Royal Catering. Dzięki temu możemy przygotować kolację lub event dla większej liczby Gości, zachowując ten sam styl i smaki naszej kuchni.',
        ctaText: 'pobierz ofertę spotkań',
        ctaText2: 'pobierz ofertę eventów'
      },
      {
        type: 'events',
        lang: 'en',
        title: 'EVENTS',
        sectionTitle: 'Celebrate with us',
        description: "At Royal Restaurant, we love celebrating together with our guests. We enjoy tables where family, friends, or colleagues gather, and where toasts and laughter fill the air.\n\nWe organize business meetings and family celebrations that are simply pleasant and unhurried. You can reserve part of the venue or the entire restaurant for a private event—so you have the space just for yourself and your guests.\n\nWe have our own pastry shop, so cakes and desserts are made from scratch and tailored to your needs - perfectly suited to the occasion and the people celebrating.\n\nWe also enjoy evenings that combine theatre and our cuisine. We are located right next to Teatr Kwadrat, so many guests pair a performance with a gathering at the table afterwards—for a dinner, dessert, or a glass of wine after the show.\n\nIf you are planning a larger event, it is also possible to host it in the theatre spaces with service provided by our Royal Catering. This allows us to prepare a dinner or event for a larger number of guests while maintaining the same style and flavors of our cuisine.",
        ctaText: 'download meeting offer',
        ctaText2: 'download event offer'
      },
      {
        type: 'instagram',
        lang: 'pl',
        title: 'ZAOBSERWUJ NAS',
        image1: '/ig/1.webp',
        link1: 'https://www.instagram.com/p/DPn0STtjUYE/',
        image2: '/ig/2.webp',
        link2: 'https://www.instagram.com/p/DQUGZ1rERUp/'
      },
      {
        type: 'instagram',
        lang: 'en',
        title: 'FOLLOW US',
        image1: '/ig/1.webp',
        link1: 'https://www.instagram.com/p/DPn0STtjUYE/',
        image2: '/ig/2.webp',
        link2: 'https://www.instagram.com/p/DQUGZ1rERUp/'
      },
      {
        type: 'footer',
        lang: 'pl',
        description: 'Wyjątkowe miejsce, gdzie tradycyjna polska kuchnia spotyka domową atmosferę.',
        openingHoursTitle: 'GODZINY OTWARCIA',
        mondayFriday: 'Poniedziałek - Piątek',
        saturday: 'Sobota',
        sunday: 'Niedziela',
        orderOnline: 'ZAMÓW ONLINE',
        orderPyszne: 'Zamów przez pyszne.pl',
        orderSubtext: 'Szybko i wygodnie',
        contact: 'KONTAKT'
      },
      {
        type: 'footer',
        lang: 'en',
        description: 'A unique place where traditional Polish cuisine meets a homely atmosphere.',
        openingHoursTitle: 'OPENING HOURS',
        mondayFriday: 'Monday – Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
        orderOnline: 'ORDER ONLINE',
        orderPyszne: 'Order via pyszne.pl',
        orderSubtext: 'Fast and convenient',
        contact: 'CONTACT'
      },
      {
        type: 'settings',
        lang: 'pl',
        restaurantName: 'Royal Restaurant',
        address: 'Marszałkowska 138',
        city: '00-001 Warszawa',
        phone: '+48 696 566 633',
        instagram: 'https://instagram.com/royalrestaurant_warsaw',
        facebook: 'https://facebook.com/RoyalRestaurantWarsaw/',
        description: '© 2024 Royal Restaurant. Wszystkie prawa zastrzeżone.'
      },
      {
        type: 'settings',
        lang: 'en',
        restaurantName: 'Royal Restaurant',
        address: 'Marszałkowska 138',
        city: '00-001 Warsaw',
        phone: '+48 696 566 633',
        instagram: 'https://instagram.com/royalrestaurant_warsaw',
        facebook: 'https://facebook.com/RoyalRestaurantWarsaw/',
        description: '© 2024 Royal Restaurant. All rights reserved.'
      }
    ];

    const results = [];
    for (const content of defaultContent) {
      const result = await upsertSiteContent(content.type, content);
      results.push({ type: content.type, lang: content.lang, success: result.success });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Zaszczepiono ${results.filter(r => r.success).length} z ${results.length} elementów (PL + EN)`,
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