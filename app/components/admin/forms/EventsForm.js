"use client";

import { TextField, HiddenField } from '../Field';

export default function EventsForm({ items, saving, onSave, onDelete }) {
  if (items.length === 0) {
    return (
      <div>
        <p className="text-gray-500">Brak pozycji. Dodaj nową.</p>
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
              <TextField className="md:col-span-2" label="Tytuł" name="title" defaultValue={item.title} />
              <TextField className="md:col-span-2" label="Podtytuł" name="subtitle" defaultValue={item.subtitle} />
              <TextField className="md:col-span-2" label="Opis" name="description" defaultValue={item.description} />
              <TextField label="Przycisk 1" name="ctaText" defaultValue={item.ctaText} />
              <TextField label="Link 1" name="ctaLink" defaultValue={item.ctaLink} />
              <TextField label="Przycisk 2" name="ctaText2" defaultValue={item.ctaText2} />
              <TextField label="Link 2" name="ctaLink2" defaultValue={item.ctaLink2} />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Zapisywanie...' : 'Zapisz'}
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/20"
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