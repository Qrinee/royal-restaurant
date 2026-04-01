"use client";

import { useState } from 'react';

export default function SettingsSection({ content, onSave, saving, error }) {
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
      <h2 className="text-white text-xl mb-6">Ustawienia</h2>
      
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={localContent.id || ''} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Nazwa restauracji</label>
            <input
              type="text"
              name="restaurantName"
              value={localContent.restaurantName || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Adres</label>
            <input
              type="text"
              name="address"
              value={localContent.address || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Telefon</label>
            <input
              type="text"
              name="phone"
              value={localContent.phone || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Email</label>
            <input
              type="text"
              name="email"
              value={localContent.email || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={localContent.socialLinks?.instagram || ''}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1 uppercase">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={localContent.socialLinks?.facebook || ''}
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