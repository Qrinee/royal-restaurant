import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !file.name) {
      return NextResponse.json({ error: 'Brak pliku' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const ext = file.name.split('.').pop();
    const fileName = `${uniqueSuffix}.${ext}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    try {
      await writeFile(join(uploadDir, fileName), buffer);
    } catch {
      await writeFile(join(process.cwd(), 'public', fileName), buffer);
      return NextResponse.json({ 
        success: true, 
        url: `/${fileName}` 
      });
    }

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${fileName}` 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Błąd przesyłania: ' + error.message }, { status: 500 });
  }
}