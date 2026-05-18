"use client";

import ImageUploader from '../../ImageUploader';
import { TextField, TextAreaField } from '../Field';

export default function AboutForm({ content }) {
  return (
    <>
      <TextField className="md:col-span-2" label="Tytuł sekcji" name="title" defaultValue={content?.title} />
      <TextField className="md:col-span-2" label="Podtytuł" name="sectionTitle" defaultValue={content?.sectionTitle} />
      <TextAreaField className="md:col-span-2" label={'Opis (użyj \\n\\n do nowych akapitów)'}
        name="description" defaultValue={content?.description} style={{ minHeight: '200px' }} />
      <ImageUploader name="image1" defaultValue={content?.image1} label="Zdjęcie" />
    </>
  );
}