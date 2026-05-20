import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const UPLOADS_DIR = process.env.UPLOADS_DIR || join(process.cwd(), 'public', 'uploads');

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !file.name) {
      return NextResponse.json({ error: 'Brak pliku' }, { status: 400 });
    }

    // Allow images and PDFs
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';
    if (!isImage && !isPdf) {
      return NextResponse.json({ error: 'Dozwolone tylko pliki graficzne i PDF' }, { status: 400 });
    }

    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const ext = file.name.split('.').pop();
    const fileName = `${uniqueSuffix}.${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    try {
      await mkdir(UPLOADS_DIR, { recursive: true });
    } catch {
      // Directory already exists
    }

    await writeFile(join(UPLOADS_DIR, fileName), buffer);

    // Return the public URL path (served via /api/uploads/[...path] + next.config rewrite)
    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Błąd przesyłania: ' + error.message },
      { status: 500 }
    );
  }
}
