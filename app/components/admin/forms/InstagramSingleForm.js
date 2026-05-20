"use client";

import ImageUploader from '../../ImageUploader';
import { TextField } from '../Field';

export default function InstagramSingleForm({ content }) {
  return (
    <>
      <ImageUploader name="image1" defaultValue={content?.image1} label="Zdjęcie 1" required />
      <TextField
        label="Link do posta 1"
        name="link1"
        defaultValue={content?.link1}
        tooltip="Bezpośredni link do posta na Instagramie. np. https://www.instagram.com/p/..."
        validateAs="url"
      />
      <ImageUploader name="image2" defaultValue={content?.image2} label="Zdjęcie 2" required />
      <TextField
        label="Link do posta 2"
        name="link2"
        defaultValue={content?.link2}
        tooltip="Bezpośredni link do posta na Instagramie."
        validateAs="url"
      />
      <ImageUploader name="image3" defaultValue={content?.image3} label="Zdjęcie 3" required />
      <TextField
        label="Link do posta 3"
        name="link3"
        defaultValue={content?.link3}
        tooltip="Bezpośredni link do posta na Instagramie."
        validateAs="url"
      />
      <ImageUploader name="image4" defaultValue={content?.image4} label="Zdjęcie 4" required />
      <TextField
        label="Link do posta 4"
        name="link4"
        defaultValue={content?.link4}
        tooltip="Bezpośredni link do posta na Instagramie."
        validateAs="url"
      />
    </>
  );
}