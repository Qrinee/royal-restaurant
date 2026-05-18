"use client";

import { TextField } from '../Field';

export default function FooterForm({ content }) {
  return (
    <TextField className="md:col-span-2" label="Copyright tekst" name="description" defaultValue={content?.description} />
  );
}