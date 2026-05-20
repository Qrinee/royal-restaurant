"use client";

import { TextField } from '../Field';

export default function FooterForm({ content }) {
  return (
    <>
      <TextField
        label="Nazwa restauracji"
        name="restaurantName"
        defaultValue={content?.restaurantName}
        tooltip="Nazwa wyświetlana w stopce strony. np. Royal Restaurant"
        required
      />
      <TextField
        label="Adres"
        name="address"
        defaultValue={content?.address}
        tooltip="Fizyczny adres restauracji. Widoczny w lewej kolumnie stopki pod ikoną pinezki."
      />
      <TextField
        label="Telefon"
        name="phone"
        defaultValue={content?.phone}
        tooltip="Numer telefonu wyświetlany w stopce pod ikoną słuchawki."
      />

      {/* Opening Hours */}
      <div className="md:col-span-2 border-t border-gray-800 pt-4">
        <p className="text-gray-400 text-sm mb-3">Godziny otwarcia</p>
      </div>
      <TextField
        label="Poniedziałek – Piątek"
        name="mondayFriday"
        defaultValue={content?.mondayFriday || content?.openingHours?.[0]?.hours}
        tooltip="Godziny otwarcia w dni powszednie. np. 12:00 - 22:00"
      />
      <TextField
        label="Sobota"
        name="saturday"
        defaultValue={content?.saturday || content?.openingHours?.[1]?.hours}
        tooltip="Godziny otwarcia w soboty. np. 9:00 - 22:00"
      />
      <div className="md:col-span-2 mb-0" />
      <TextField
        label="Niedziela"
        name="sunday"
        defaultValue={content?.sunday || content?.openingHours?.[2]?.hours}
        tooltip="Godziny otwarcia w niedziele. np. 9:00 - 22:00"
      />
      <div className="md:col-span-2" />

      {/* Social */}
      <div className="md:col-span-2 border-t border-gray-800 pt-4">
        <p className="text-gray-400 text-sm mb-3">Media społecznościowe</p>
      </div>
      <TextField
        label="Link do Instagrama"
        name="instagram"
        defaultValue={content?.socialLinks?.instagram || content?.instagram}
        tooltip="Pełny adres URL profilu Instagram. Widoczny jako ikonka IG w stopce."
        validateAs="url"
      />
      <TextField
        label="Link do Facebooka"
        name="facebook"
        defaultValue={content?.socialLinks?.facebook || content?.facebook}
        tooltip="Pełny adres URL profilu Facebook. Widoczny jako ikonka FB w stopce."
        validateAs="url"
      />
      <div className="md:col-span-2" />

      {/* Copyright */}
      <div className="md:col-span-2 border-t border-gray-800 pt-4">
        <p className="text-gray-400 text-sm mb-3">Stopka</p>
      </div>
      <TextField
        className="md:col-span-2"
        label="Tekst copyright"
        name="description"
        defaultValue={content?.description}
        tooltip="Tekst copyright na samym dole stopki. np. © 2026 Royal Restaurant. Wszelkie prawa zastrzeżone."
      />
    </>
  );
}