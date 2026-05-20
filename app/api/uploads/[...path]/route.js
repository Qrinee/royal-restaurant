import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOADS_DIR = process.env.UPLOADS_DIR || join(process.cwd(), 'public', 'uploads');

export async function GET(request, { params }) {
  try {
    const { path } = await params;
    const filePath = join(UPLOADS_DIR, ...path);

    // Security: prevent directory traversal
    if (!filePath.startsWith(UPLOADS_DIR)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    if (!existsSync(filePath)) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const buffer = await readFile(filePath);

    // Determine content type based on extension
    const ext = filePath.split('.').pop()?.toLowerCase();
    const mimeTypes = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      pdf: 'application/pdf',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}