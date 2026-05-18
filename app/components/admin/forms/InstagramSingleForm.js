"use client";

import ImageUploader from '../../ImageUploader';
import { TextField } from '../Field';

export default function InstagramSingleForm({ content }) {
  return (
    <>
      <ImageUploader name="image1" defaultValue={content?.image1} label="Zdjęcie 1" />
      <TextField label="URL 1" name="link1" defaultValue={content?.link1} />
      <ImageUploader name="image2" defaultValue={content?.image2} label="Zdjęcie 2" />
      <TextField label="URL 2" name="link2" defaultValue={content?.link2} />
      <ImageUploader name="image3" defaultValue={content?.image3} label="Zdjęcie 3" />
      <TextField label="URL 3" name="link3" defaultValue={content?.link3} />
      <ImageUploader name="image4" defaultValue={content?.image4} label="Zdjęcie 4" />
      <TextField label="URL 4" name="link4" defaultValue={content?.link4} />
    </>
  );
}