"use client";

import ImageUploader from '../../ImageUploader';
import { TextField, TextAreaField } from '../Field';

export default function HeroForm({ content }) {
  return (
    <>
      <TextField
        className="md:col-span-2"
        label="Etykieta nad tytułem"
        name="badge"
        defaultValue={content?.badge}
        tooltip="Wyświetla się u samej góry sekcji Hero jako mały znacznik. np. ROYAL RESTAURANT"
        required
      />
      <TextField
        className="md:col-span-2"
        label="Tytuł główny"
        name="title"
        defaultValue={content?.title}
        tooltip="Główny, duży nagłówek na samej górze strony. Widoczny od razu po wejściu."
        required
      />
      <TextField
        className="md:col-span-2"
        label="Podtytuł"
        name="subtitle"
        defaultValue={content?.subtitle}
        tooltip="Mniejszy tekst pod głównym tytułem. Uzupełnia przekaz."
      />
      <TextField
        className="md:col-span-2"
        label="Przyrostek tytułu"
        name="suffix"
        defaultValue={content?.suffix}
        tooltip={'Tekst pojawiający się zaraz po tytule głównym, zwykle pochylony. np. "przy polskim stole"'}
      />
      <TextAreaField
        className="md:col-span-2"
        label="Opis"
        name="description"
        defaultValue={content?.description}
        tooltip="Krótki tekst opisowy widoczny pod nagłówkiem. Może zawierać godziny otwarcia itp."
      />
      <TextField
        label="Tekst pierwszego przycisku"
        name="ctaText"
        defaultValue={content?.ctaText}
        tooltip="Nazwa pierwszego przycisku akcji, np. ZOBACZ MENU"
      />
      <TextField
        label="Link pierwszego przycisku"
        name="ctaLink"
        defaultValue={content?.ctaLink}
        tooltip="Dokąd prowadzi pierwszy przycisk. np. /menu lub https://..."
        validateAs="url"
      />
      <TextField
        label="Tekst drugiego przycisku"
        name="ctaText2"
        defaultValue={content?.ctaText2}
        tooltip="Nazwa drugiego przycisku akcji, np. ZAREZERWUJ"
      />
      <TextField
        label="Link drugiego przycisku"
        name="ctaLink2"
        defaultValue={content?.ctaLink2}
        tooltip="Dokąd prowadzi drugi przycisk. np. link do systemu rezerwacji"
        validateAs="url"
      />
      <ImageUploader name="image1" defaultValue={content?.image1} label="Zdjęcie główne (duże)" required />
      <ImageUploader name="image2" defaultValue={content?.image2} label="Zdjęcie 2 (prawe górne)" />
      <ImageUploader name="image3" defaultValue={content?.image3} label="Zdjęcie 3 (lewe dolne)" />
      <ImageUploader name="image4" defaultValue={content?.image4} label="Zdjęcie 4 (prawe dolne)" />
    </>
  );
}