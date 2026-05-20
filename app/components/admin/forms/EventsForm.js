"use client";

import ImageUploader from '../../ImageUploader';
import PdfUploader from '../PdfUploader';
import { TextField, TextAreaField, HiddenField } from '../Field';

export default function EventsForm({ items, saving, onSave, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-center">
        <p className="text-gray-500">Brak pozycji. Kliknij + Dodaj nowe aby utworzyć pierwszą.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="bg-[#111111] border border-gray-800 rounded-xl p-4">
          <form onSubmit={onSave}>
            <HiddenField name="id" value={item.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                className="md:col-span-2"
                label="Tytuł eventu"
                name="title"
                defaultValue={item.title}
                tooltip="Główny nagłówek widoczny w sekcji Eventy. Np. 'Organizacja przyjęć'"
                required
              />
              <TextField
                className="md:col-span-2"
                label="Podtytuł"
                name="subtitle"
                defaultValue={item.subtitle}
                tooltip="Mniejszy tekst pod tytułem. Wyświetla się z akcentem kolorystycznym."
              />
              <TextAreaField
                className="md:col-span-2"
                label="Opis"
                name="description"
                defaultValue={item.description}
                tooltip="Główny tekst opisujący usługę. Enterem oddzielaj akapity."
                style={{ minHeight: '140px' }}
              />
              <TextField
                label="Tekst pierwszego przycisku"
                name="ctaText"
                defaultValue={item.ctaText}
                tooltip="Napis na lewym przycisku, np. POBIERZ MENU"
              />
              <PdfUploader
                name={`ctaLink_${item.id}`}
                defaultValue={item.ctaLink}
                label="PDF dla pierwszego przycisku"
              />
              <TextField
                label="Tekst drugiego przycisku"
                name="ctaText2"
                defaultValue={item.ctaText2}
                tooltip="Napis na prawym przycisku, np. POBIERZ OFERTĘ"
              />
              <PdfUploader
                name={`ctaLink2_${item.id}`}
                defaultValue={item.ctaLink2}
                label="PDF dla drugiego przycisku"
              />
              <div className="md:col-span-2">
                <ImageUploader name={`image1_${item.id}`} defaultValue={item.image1} label="Zdjęcie główne" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50 text-sm"
              >
                {saving ? 'Zapisywanie...' : 'Zapisz'}
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 hover:border-red-400 text-sm transition-colors"
              >
                Usuń
              </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}