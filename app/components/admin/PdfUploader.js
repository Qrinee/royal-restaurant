"use client";

import { useState, useRef } from 'react';

export default function PdfUploader({ name, defaultValue, label, tooltip }) {
  const [fileName, setFileName] = useState(
    defaultValue ? decodeURIComponent(defaultValue.split('/').pop() || defaultValue) : ''
  );
  const [path, setPath] = useState(defaultValue || '');
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
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success) {
        setFileName(file.name);
        setPath(data.url);
      } else {
        alert(data.error || 'Błąd przesyłania');
      }
    } catch {
      alert('Błąd przesyłania');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      uploadFile(file);
    } else {
      alert('Dozwolone tylko pliki PDF');
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        uploadFile(file);
      } else {
        alert('Dozwolone tylko pliki PDF');
      }
    }
  }

  return (
    <div>
      {label && <label className="block text-gray-400 text-xs mb-1 uppercase">{label}</label>}
      <input type="hidden" name={name} value={path} />

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors
          ${dragOver ? 'border-[#b08d8d] bg-[#b08d8d]/10' : 'border-gray-700 hover:border-gray-500'}
          ${path ? '' : 'min-h-[80px] flex items-center justify-center'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-5 h-5 border-2 border-[#b08d8d] border-t-transparent rounded-full animate-spin" />
            <span>Przesyłanie...</span>
          </div>
        ) : path ? (
          <div className="flex items-center gap-3 py-1">
            <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-300 text-sm truncate">{fileName}</p>
              <p className="text-gray-500 text-xs mt-0.5">Kliknij aby zmienić</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div className="text-sm">Przeciągnij PDF lub kliknij</div>
            <div className="text-xs text-gray-600 mt-1">.pdf</div>
          </div>
        )}
      </div>

      {path && (
        <div className="mt-1">
          <span className="text-xs text-gray-500">{path}</span>
        </div>
      )}
    </div>
  );
}