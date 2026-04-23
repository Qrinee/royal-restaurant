import { NextResponse } from 'next/server';
import { verifyTokenAsync, getTokenFromCookies } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request) {
  const token = getTokenFromCookies(request.cookies);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const decoded = await verifyTokenAsync(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('siteContent');

    // Update hero documents: set image3 and image4 if they're missing/empty
    const result = await collection.updateMany(
      { type: 'hero', $or: [{ image3: { $exists: false } }, { image3: '' }] },
      { $set: { image3: '/ig/2.webp' } }
    );

    const result2 = await collection.updateMany(
      { type: 'hero', $or: [{ image4: { $exists: false } }, { image4: '' }] },
      { $set: { image4: '/ig/3.webp' } }
    );

    return NextResponse.json({
      success: true,
      message: `Uzupełniono brakujące image3 (${result.modifiedCount}) i image4 (${result2.modifiedCount})`
    });
  } catch (error) {
    console.error('Error setting default hero images:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
