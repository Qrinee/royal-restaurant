"use client";

import { TextField } from '../Field';

export default function SettingsForm({ content }) {
  return (
    <>
      <TextField label="Nazwa restauracji" name="restaurantName" defaultValue={content?.restaurantName} />
      <TextField label="Adres" name="address" defaultValue={content?.address} />
      <TextField label="Telefon" name="phone" defaultValue={content?.phone} />
      <TextField label="Email" name="email" defaultValue={content?.email} />
      <TextField label="Instagram" name="instagram" defaultValue={content?.socialLinks?.instagram} />
      <TextField label="Facebook" name="facebook" defaultValue={content?.socialLinks?.facebook} />
    </>
  );
}