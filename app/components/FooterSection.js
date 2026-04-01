"use client";

import { useState } from 'react';

export default function FooterSection({ content, onSave, saving, error }) {
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
      <h2 className="text-white text-xl mb-6">Stopka</h2>
      
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={localContent.id || ''} />
        <div className="md:col-span-2">
          <label className="block text-gray-400 text-xs mb-1 uppercase">Copyright tekst</label>
          <input
            type="text"
            name="description"
            value={localContent.description || ''}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
          />
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