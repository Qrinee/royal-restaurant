"use client";

import ImageUploader from '../../ImageUploader';
import { TextField, TextAreaField } from '../Field';

export default function HeroForm({ content }) {
  return (
    <>
      <TextField className="md:col-span-2" label="BADGE (np. ROYAL RESTAURANT)" name="badge" defaultValue={content?.badge} />
      <TextField className="md:col-span-2" label="Tytuł" name="title" defaultValue={content?.title} />
      <TextField className="md:col-span-2" label="Podtytuł" name="subtitle" defaultValue={content?.subtitle} />
      <TextField className="md:col-span-2" label={'Przyrostka (np. "przy polskim stole")'} name="suffix" defaultValue={content?.suffix} />
      <TextAreaField className="md:col-span-2" label="Opis" name="description" defaultValue={content?.description} />
      <TextField label="Przycisk 1" name="ctaText" defaultValue={content?.ctaText} />
      <TextField label="Link 1" name="ctaLink" defaultValue={content?.ctaLink} />
      <TextField label="Przycisk 2" name="ctaText2" defaultValue={content?.ctaText2} />
      <TextField label="Link 2" name="ctaLink2" defaultValue={content?.ctaLink2} />
      <ImageUploader name="image1" defaultValue={content?.image1} label="Zdjęcie 1 (duże)" />
      <ImageUploader name="image2" defaultValue={content?.image2} label="Zdjęcie 2 (prawe górne)" />
      <ImageUploader name="image3" defaultValue={content?.image3} label="Zdjęcie 3 (lewe dolne)" />
      <ImageUploader name="image4" defaultValue={content?.image4} label="Zdjęcie 4 (prawe dolne)" />
    </>
  );
}