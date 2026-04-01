"use client";

import { useState } from 'react';

export default function HeroSection({ content, onSave, saving, error }) {
  const [localContent, setLocalContent] = useState(content || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localContent);
  };

  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
      <h2 className="text-white text-xl mb-6">Sekcja Hero</h2>
      
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={localContent.id || ''} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-gray-400 text-xs mb-1 uppercase">ROYAL RESTAURANT</label>
            <input
              type="text"
              name="badge"
              value={localContent.badge || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-400 text-xs mb-1 uppercase">Tytuł</label>
            <input
              type="text"
              name="title"
              value={localContent.title || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-400 text-xs mb-1 uppercase">Podtytuł</label>
            <input
              type="text"
              name="subtitle"
              value={localContent.subtitle || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-400 text-xs mb-1 uppercase">Opis</label>
            <input
              type="text"
              name="description"
              value={localContent.description || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Przycisk 1</label>
            <input
              type="text"
              name="ctaText"
              value={localContent.ctaText || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Link 1</label>
            <input
              type="text"
              name="ctaLink"
              value={localContent.ctaLink || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Przycisk 2</label>
            <input
              type="text"
              name="ctaText2"
              value={localContent.ctaText2 || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Link 2</label>
            <input
              type="text"
              name="ctaLink2"
              value={localContent.ctaLink2 || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Zdjęcie 1</label>
            <input
              type="text"
              name="image1"
              value={localContent.image1 || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Zdjęcie 2</label>
            <input
              type="text"
              name="image2"
              value={localContent.image2 || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={saving}
          className="mt-6 px-6 py-3 bg-[#b08d8d] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </button>
      </form>
    </div>
  );
}