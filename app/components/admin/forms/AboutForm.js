"use client";

import ImageUploader from '../../ImageUploader';
import { TextField, TextAreaField } from '../Field';

export default function AboutForm({ content }) {
  return (
    <>
      <TextField
        className="md:col-span-2"
        label="Tytuł sekcji"
        name="title"
        defaultValue={content?.title}
        tooltip="Duży nagłówek na górze sekcji 'O nas'. np. Nasza historia"
        required
      />
      <TextField
        className="md:col-span-2"
        label="Podtytuł"
        name="sectionTitle"
        defaultValue={content?.sectionTitle}
        tooltip="Mniejszy tekst pod tytułem, często z akcentem kolorystycznym."
      />
      <TextAreaField
        className="md:col-span-2"
        label="Treść opisu"
        name="description"
        defaultValue={content?.description}
        style={{ minHeight: '200px' }}
        tooltip="Główna treść sekcji. Enterem oddzielaj akapity - na stronie każdy akapit będzie osobnym blokiem tekstu."
        required
      />
      <ImageUploader name="image1" defaultValue={content?.image1} label="Zdjęcie sekcji" />
    </>
  );
}