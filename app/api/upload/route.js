import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !file.name) {
      return NextResponse.json({ error: 'Brak pliku' }, { status: 400 });
    }

    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const ext = file.name.split('.').pop();
    const fileName = `${uniqueSuffix}.${ext}`;

    // Use Vercel Blob if token is available (production on Vercel)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(fileName, file, {
          access: 'public',
          contentType: file.type,
          // Prevent caching of uploaded images
          cacheControl: 'no-cache, no-store, must-revalidate',
        });

        return NextResponse.json({
          success: true,
          url: blob.url,
          pathname: blob.pathname,
        });
      } catch (blobError) {
        console.error('Vercel Blob upload failed:', blobError);
        return NextResponse.json(
          { error: 'Błąd przesyłania do chmury: ' + blobError.message },
          { status: 500 }
        );
      }
    }

    // In production without Vercel Blob token, fail early
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Brak konfiguracji Vercel Blob. Skonfiguruj BLOB_READ_WRITE_TOKEN.' },
        { status: 500 }
      );
    }

    // Fallback to local filesystem (development)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    try {
      await writeFile(join(uploadDir, fileName), buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/${fileName}`,
      });
    } catch {
      await writeFile(join(process.cwd(), 'public', fileName), buffer);
      return NextResponse.json({
        success: true,
        url: `/${fileName}`,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Błąd przesyłania: ' + error.message },
      { status: 500 }
    );
  }
}
