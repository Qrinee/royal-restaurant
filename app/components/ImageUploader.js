"use client";

import { useState, useRef } from 'react';

export default function ImageUploader({ name, defaultValue, label }) {
  const [preview, setPreview] = useState(defaultValue || '');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  async function uploadFile(file) {
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const data = await res.json();
      
      if (data.success) {
        setPreview(data.url);
      } else {
        alert(data.error || 'Błąd przesyłania');
      }
    } catch (e) {
      alert('Błąd przesyłania');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  }

  return (
    <div>
      {label && <label className="block text-gray-400 text-xs mb-1 uppercase">{label}</label>}
      <input type="hidden" name={name} value={preview} />
      
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors
          ${dragOver ? 'border-[#b08d8d] bg-[#b08d8d]/10' : 'border-gray-700 hover:border-gray-500'}
          ${preview ? '' : 'min-h-[100px] flex items-center justify-center'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {uploading ? (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-5 h-5 border-2 border-[#b08d8d] border-t-transparent rounded-full animate-spin"></div>
            <span>Przesyłanie...</span>
          </div>
        ) : preview ? (
          <div className="relative group">
            <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
              <span className="text-white text-sm">Kliknij aby zmienić</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-3xl mb-2">📁</div>
            <div className="text-sm">Przeciągnij obrazek lub kliknij</div>
          </div>
        )}
      </div>
      
      {preview && (
        <div className="mt-1">
          <span className="text-xs text-gray-500">{preview}</span>
        </div>
      )}
    </div>
  );
}