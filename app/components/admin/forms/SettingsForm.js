"use client";

import { TextField } from '../Field';

export default function SettingsForm({ content }) {
  return (
    <>
      <TextField
        label="Nazwa restauracji"
        name="restaurantName"
        defaultValue={content?.restaurantName}
        tooltip="Nazwa wyświetlana w nagłówku strony, stopce i tytule przeglądarki."
        required
      />
      <TextField
        label="Adres"
        name="address"
        defaultValue={content?.address}
        tooltip="Fizyczny adres restauracji. Widoczny w stopce i na podstronach."
      />
      <TextField
        label="Telefon"
        name="phone"
        defaultValue={content?.phone}
        tooltip="Numer kontaktowy do restauracji. Wyświetlany w stopce."
      />
      <TextField
        label="Email"
        name="email"
        defaultValue={content?.email}
        tooltip="Adres email restauracji. Może być użyty w formularzu kontaktowym."
      />
      <TextField
        label="Link do Instagrama"
        name="instagram"
        defaultValue={content?.socialLinks?.instagram}
        tooltip="Pełny adres URL profilu Instagram. np. https://www.instagram.com/royalrestaurant"
        validateAs="url"
      />
      <TextField
        label="Link do Facebooka"
        name="facebook"
        defaultValue={content?.socialLinks?.facebook}
        tooltip="Pełny adres URL profilu Facebook. np. https://www.facebook.com/royalrestaurant"
        validateAs="url"
      />
    </>
  );
}